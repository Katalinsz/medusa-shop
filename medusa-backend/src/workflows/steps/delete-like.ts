import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { LIKE_MODULE } from "../../modules/like";
import LikeModuleService from "../../modules/like/service";
type DeleteLikeStepInput = {
  like_id: string;
};
export const deleteLikeStep = createStep(
  "delete-like-step",
  async (input: DeleteLikeStepInput, { container }) => {
    const likeModuleService: LikeModuleService = container.resolve(LIKE_MODULE);
    await likeModuleService.deleteLikes(input.like_id);
    return new StepResponse(null);
  }
);
