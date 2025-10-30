import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { LIKE_MODULE } from "../modules/like";
import LikeModuleService from "../modules/like/service";
import { deleteLikeStep } from "./steps/delete-like";

type DeleteLikeWorkflowInput = {
  like_id: string;
};

export const deleteLikeWorkflow = createWorkflow(
  "delete-like",
  function (input: DeleteLikeWorkflowInput) {
    const like = deleteLikeStep(input);
    return new WorkflowResponse(null);
  }
);
