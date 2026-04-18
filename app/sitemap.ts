import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const BASE_URL = 'https://www.hexescortsug.xyz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // 1. Static Pages (Always return these even if DB fails)
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                         lastModified: now, changeFrequency: 'daily',   priority: 1    },
    { url: `${BASE_URL}/about`,              lastModified: now, changeFrequency: 'monthly', priority: 0.7  },
    { url: `${BASE_URL}/faq`,               lastModified: now, changeFrequency: 'monthly', priority: 0.7  },
    { url: `${BASE_URL}/become-escort`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE_URL}/vip`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${BASE_URL}/location`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
  ]

  const CITIES = ['kampala', 'entebbe', 'jinja', 'mbarara', 'gulu', 'fort-portal', 'mbale', 'tororo', 'mukono']
  const locationUrls: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE_URL}/location/${city}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  try {
    // Check if env vars exist before creating client
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Sitemap: Missing Supabase credentials, returning static pages only.')
      return [...staticPages, ...locationUrls]
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    // 3. Profiles from Database
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, updated_at')
      .eq('is_archived', false)

    if (error) throw error

    let profileUrls: MetadataRoute.Sitemap = []
    if (profiles) {
      profileUrls = profiles.map((p) => ({
        url: `${BASE_URL}/profile/${p.id}`,
        lastModified: new Date(p.updated_at || now),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
    }

    return [...staticPages, ...locationUrls, ...profileUrls]
  } catch (error) {
    console.error('Sitemap generation error:', error)
    // Return static pages as fallback so Google doesn't get a 500 error
    return [...staticPages, ...locationUrls]
  }
}
