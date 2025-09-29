import { defineMiddlewares, authenticate, validateAndTransformBody } from "@medusajs/framework/http"

import { PostApiPatternAddSchema } from "./api/pattern/add/validators"

export default defineMiddlewares({
  routes: [
    {
      method: ["POST"],
      // match the path you picked:
      matcher: "/api/pattern/add", // or "/admin/pattern/add"
      middlewares: [authenticate("user", ["bearer", "session"])],
      //validateAndTransformBody(PostApiPatternAddSchema)
    },
  ],
})
