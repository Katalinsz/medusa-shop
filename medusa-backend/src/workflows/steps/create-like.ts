import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { LIKE_MODULE } from "../../modules/like";
import LikeModuleService from "../../modules/like/service";

export type CreateLikeStepInput = {
  user_id: string;
  product_id: string;
};

export const createLikeStep = createStep(
  "create-like-step",
  async (input: CreateLikeStepInput, { container }) => {
    const likeModuleService: LikeModuleService = container.resolve(LIKE_MODULE);
    const like = await likeModuleService.createLikes(input);
    return new StepResponse(like, like.id);
  },
  async (like_id, { container }) => {
    if (!like_id) {
      return;
    }
    const likeModuleService: LikeModuleService = container.resolve(LIKE_MODULE);
    await likeModuleService.deleteLikes(like_id);
  }
);
