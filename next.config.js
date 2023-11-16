/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'file-eu-1.sendbird.com'
      },
      {
        protocol: 'https',
        hostname: 'flaticon.com'
      },
    ],
  },
}

module.exports = nextConfig
