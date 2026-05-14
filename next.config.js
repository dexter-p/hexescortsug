/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['zdiosdkoxcimlovewroz.supabase.co', 'images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/location/:path*',
        destination: '/escorts-in/:path*',
        permanent: true,
      },
      {
        source: '/sitemap.txt',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ]
  },
  // Force trailing slash for consistency (better for SEO consolidation)
  trailingSlash: false,
}

export default nextConfig;

