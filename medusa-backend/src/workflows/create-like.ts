import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { LIKE_MODULE } from "../modules/like";
import LikeModuleService from "../modules/like/service";
import { createLikeStep } from "./steps/create-like";

type CreateLikeWorkflowInput = {
  user_id: string;
  product_id: string;
};

export const createLikeWorkflow = createWorkflow(
  "create-like",
  function (input: CreateLikeWorkflowInput) {
    const like = createLikeStep(input);
    return new WorkflowResponse(like);
  }
);
