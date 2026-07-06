import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.101:3000"],
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
