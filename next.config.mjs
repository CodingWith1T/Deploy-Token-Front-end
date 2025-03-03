/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  // Ensure all routes are exported
  experimental: {
    staticPageGenerationTimeout: 120
  }
};

export default nextConfig;