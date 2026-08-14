import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(process.env.PAGES_BASE_PATH
    ? { basePath: process.env.PAGES_BASE_PATH }
    : {}),
};

export default nextConfig;
