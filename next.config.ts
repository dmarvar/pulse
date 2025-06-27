import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure that static assets are properly handled
  images: {
    unoptimized: true,
  },
  // Make sure Swagger UI assets are properly included
  transpilePackages: ['swagger-ui-dist'],
};

export default nextConfig;
