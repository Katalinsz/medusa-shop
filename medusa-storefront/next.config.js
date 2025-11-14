const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["70.34.196.51", "localhost"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "motif.knittedforyou.com",
      },
      {
        protocol: "http",
        hostname: "70.34.196.51",
        port: "8000",
        pathname: "/ExImages/**",
      },
      {
        protocol: "http",
        hostname: "140.82.58.69",
        port: "3000",
        pathname: "/api/images/**",
      },
      // ADD THIS NEW ENTRY FOR THE MISSING DOMAIN
      {
        protocol: "https",
        hostname: "motif.knittedforyou.com",
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig
