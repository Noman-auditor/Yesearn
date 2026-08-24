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
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
};

export default nextConfig;
