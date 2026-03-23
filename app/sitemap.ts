import { MetadataRoute } from 'next'
import { fetchAllProfiles } from '@/data/allProfiles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.hexescortsug.xyz'
  
  // Fetch profiles dynamically from the DB
  const profiles = await fetchAllProfiles().catch(() => [])
  
  const profileUrls = profiles.map((p) => ({
    url: `${baseUrl}/profile/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const cities = ['kampala', 'entebbe', 'jinja', 'mbarara', 'gulu', 'fort-portal', 'mbale']
  const locationUrls = cities.map((city) => ({
    url: `${baseUrl}/location/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Static pages
  const staticPages = [
    { url: `${baseUrl}/about`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/faq`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/become-escort`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/location`, priority: 0.85, changeFrequency: 'weekly' as const },
  ].map((p) => ({ ...p, lastModified: new Date() }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...staticPages,
    ...locationUrls,
    ...profileUrls,
  ]
}

