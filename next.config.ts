import type { NextConfig } from 'next';

// Load and validate environment variables
import 'dotenv-safe/config';

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression
  compress: true,

  // Performance optimizations
  poweredByHeader: false,

  // Bundle analyzer (optional, can be enabled for debugging)
  // bundlePagesRouterDependencies: true,
};

export default nextConfig;
