import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/hx-ctrl-7k9/', '/admin-panel/'],
    },
    sitemap: 'https://www.hexescortsug.xyz/sitemap.xml',
  }
}
