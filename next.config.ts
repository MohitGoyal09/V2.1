import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
    ],
  },
  // Optimize webpack configuration to reduce cache serialization warnings
  webpack: (config, { isServer }) => {
    // Optimize cache configuration
    if (config.cache && typeof config.cache === 'object') {
      config.cache.maxMemoryGenerations = 1;
      config.cache.maxGenerations = 1;
    }

    // Optimize module resolution
    config.resolve.symlinks = false;

    return config;
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Compress output
  compress: true,
  // Optimize bundle
  swcMinify: true,
  // Output configuration for better deployment
  output: 'standalone',
  // Disable telemetry to avoid build issues
  telemetry: false,
};

export default nextConfig;
