/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn-demo.algolia.com',
            port: '',
            pathname: '/bestbuy-0118/**',
          },
        ],
      }
}

module.exports = nextConfig
