import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { LIKE_MODULE } from "../modules/like";
import LikeModuleService from "../modules/like/service";
import { countLikeStep } from "./steps/count-like";

type CountLikeWorkflowInput = {
  product_id: string;
};

export const countLikeWorkflow = createWorkflow(
  "count-like",
  function (input: CountLikeWorkflowInput) {
    const like = countLikeStep(input);
    return new WorkflowResponse(like);
  }
);
