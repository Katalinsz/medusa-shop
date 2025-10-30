import LikeModuleService from "./service";
import { Module } from "@medusajs/framework/utils";

export const LIKE_MODULE = "like";

export default Module(LIKE_MODULE, {
  service: LikeModuleService,
});
