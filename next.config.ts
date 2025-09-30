import type { NextConfig } from 'next';

// Load and validate environment variables
import 'dotenv-safe/config';

const nextConfig: NextConfig = {
  // Static export for SEO optimization
  output: 'export',

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Image optimization - unoptimized for static export
  images: {
    unoptimized: true,
  },

  // Compression
  compress: true,

  // Performance optimizations
  poweredByHeader: false,

  // Bundle analyzer (optional, can be enabled for debugging)
  // bundlePagesRouterDependencies: true,
};

export default nextConfig;
