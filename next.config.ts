import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

initOpenNextCloudflareForDev()

export default nextConfig
