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
      },
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    async headers() {
      return [
        {
          source: '/shop/:slug*',
          headers: [
            {
              key: 'CDN-Cache-Control',
              value: 's-maxage=900, stale-while-revalidate=3600',
            },
          ],
        },
      ]
    },
}

module.exports = nextConfig
