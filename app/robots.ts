import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next/', '/api/', '/admin/', '/hx-ctrl-7k9/'],
      }
    ],
    sitemap: [
      'https://www.hexescortsug.xyz/sitemap.xml',
    ],
    host: 'www.hexescortsug.xyz',
  }
}
