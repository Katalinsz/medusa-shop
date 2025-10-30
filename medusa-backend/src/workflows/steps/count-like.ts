import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { LIKE_MODULE } from "../../modules/like";
import LikeModuleService from "../../modules/like/service";

export type CountLikeStepInput = { product_id: string };

export const countLikeStep = createStep(
  "count-like-step",
  async (input: CountLikeStepInput, { container }) => {
    const likeModuleService: LikeModuleService = container.resolve(LIKE_MODULE);
    const [, count] = await likeModuleService.listAndCountLikes(input);
    return new StepResponse(count);
  }
);
