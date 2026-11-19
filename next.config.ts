import type { NextConfig } from 'next';

// Load and validate environment variables
import 'dotenv-safe/config';

const nextConfig: NextConfig = {
  // Not a static export: /availability renders on the server so the
  // ChecaTurno API key stays there. Every other page is still prerendered.

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

  // The unlisted availability page: never indexed, even if a link leaks.
  async headers() {
    return [
      {
        source: '/availability',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
    ];
  },

  // Bundle analyzer (optional, can be enabled for debugging)
  // bundlePagesRouterDependencies: true,
};

export default nextConfig;
