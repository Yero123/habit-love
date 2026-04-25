import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
}) as (nextConfig: NextConfig) => NextConfig;

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);