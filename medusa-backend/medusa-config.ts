// medusa.config.ts
import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    server: {
      port: 9000,
      host: "0.0.0.0",
    },
  },

  // ⬇️ Add modules here
  modules: [
    {
      // Payment module (v2 way)
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "@medusajs/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY!,
              // webhookSecret: process.env.STRIPE_WEBHOOK_SECRET, // set in prod
              // capture: true,                         // optional
              // automatic_payment_methods: true,       // optional
            },
          },
        ],
      },
    },
  ],
})
