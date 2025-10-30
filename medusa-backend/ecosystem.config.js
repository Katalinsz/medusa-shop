module.exports = {
  apps: [
    {
      name: "medusa",
      cwd: "/srv/shop/medusa/medusa-backend/.medusa/server",
      script: "/srv/shop/medusa/medusa-backend/node_modules/.bin/medusa",
      args: "start -H 0.0.0.0 -p 9000",
      env_file: "/srv/shop/medusa/medusa-backend/.env.production",
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: "9000"
      },
      autorestart: true,
      watch: false,
      max_restarts: 10
    }
  ]
}
