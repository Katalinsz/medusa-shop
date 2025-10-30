import { defineLink } from "@medusajs/framework/utils";
import LikeModule from "../modules/like";
import ProductModule from "@medusajs/medusa/product";

export default defineLink(
  {
    linkable: LikeModule.linkable.like.id,
    field: "product_id",
  },
  ProductModule.linkable.product.id,
  {
    readOnly: true,
  }
);
