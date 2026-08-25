/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      '@x402/core': 'commonjs @x402/core',
      '@x402/core/client': 'commonjs @x402/core/client',
      '@x402/evm': 'commonjs @x402/evm',
      '@x402/evm/exact/client': 'commonjs @x402/evm/exact/client',
      '@x402/evm/upto/client': 'commonjs @x402/evm/upto/client',
      '@x402/svm/exact/client': 'commonjs @x402/svm/exact/client',
    });
    return config;
  },
};

module.exports = nextConfig;

