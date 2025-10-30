import { MedusaService } from "@medusajs/framework/utils";
import Like from "./models/like";

class LikeModuleService extends MedusaService({
  Like,
}) {}

export default LikeModuleService;
