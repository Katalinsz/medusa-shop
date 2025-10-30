import { model } from "@medusajs/framework/utils";

export const Like = model
  .define("like", {
    id: model.id().primaryKey(),
    user_id: model.text(),
    product_id: model.text(),
  })
  .indexes([
    {
      on: ["user_id", "product_id"],

      unique: true,
    },
  ]);

export default Like;
