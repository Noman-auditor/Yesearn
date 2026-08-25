/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@reown/appkit',
    '@reown/appkit-adapter-wagmi',
    '@wagmi/connectors',
    '@base-org/account',
    '@coinbase/cdp-sdk'
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@x402/evm/upto/client': false,
      '@x402/evm/exact/client': false,
      '@x402/core/client': false,
      '@x402/svm/exact/client': false,
      '@x402/evm': false,
    };
    return config;
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  }
};
export default nextConfig;