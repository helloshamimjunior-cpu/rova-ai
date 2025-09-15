// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ বিল্ডে লিন্ট ইস্যু থাকলেও ফেল করবে না
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
