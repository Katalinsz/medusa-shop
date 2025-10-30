import {
  AuthenticatedMedusaRequest,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";
import { createLikeWorkflow } from "../../../../../workflows/create-like";
import { deleteLikeWorkflow } from "../../../../../workflows/delete-like";
import { countLikeWorkflow } from "../../../../../workflows/count-like";

export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const valid = await validateUserAndProduct(req, res);
  if (!valid) return;

  const { userId, productId } = valid;

  const { result } = await createLikeWorkflow(req.scope).run({
    input: {
      product_id: productId,
      user_id: userId,
    },
  });

  res.json({ like: result });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { data: products } = await req.scope.resolve("query").graph({
    entity: "product",
    fields: ["id"],
    filters: { id: req.params.id },
  });

  if (!products?.length) {
    res
      .status(404)
      .json({ message: `Product not found for ID: ${req.params.id}` });
    return;
  }

  const { result } = await countLikeWorkflow(req.scope).run({
    input: {
      product_id: products[0].id,
    },
  });

  res.json({
    message: "Likes found",
    likes: result,
  });
}

export async function DELETE(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const valid = await validateUserAndProduct(req, res);
  if (!valid) return;

  const { userId, productId } = valid;

  const { data: likes } = await req.scope.resolve("query").graph({
    entity: "like",
    fields: ["*"],
    filters: { product_id: productId, user_id: userId },
  });
  if (!likes?.length) {
    res.status(404).json({ message: "Like not found" });
    return;
  }
  const { result } = await deleteLikeWorkflow(req.scope).run({
    input: {
      like_id: likes[0].id,
    },
  });
  res.json({
    message: "Like deleted",
    like: result,
  });
}

async function validateUserAndProduct(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const userId = req.auth_context?.actor_id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { data: products } = await req.scope.resolve("query").graph({
    entity: "product",
    fields: ["id"],
    filters: { id: req.params.id },
  });

  if (!products?.length) {
    res
      .status(404)
      .json({ message: `Product not found for ID: ${req.params.id}` });
    return;
  }

  return { userId, productId: products[0].id };
}
