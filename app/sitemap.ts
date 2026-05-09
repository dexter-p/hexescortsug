import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export const revalidate = 3600; // Refresh sitemap once per hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = 'https://www.hexescortsug.com'
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/become-escort`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vip`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/location`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ]

  const cities = [
    'kampala', 'entebbe', 'jinja', 'mbarara', 'gulu', 'fort-portal', 'mbale', 'tororo', 'mukono', 
    'masaka', 'arua', 'lira', 'kasese', 'hoima', 'soroti', 'busia', 'mubende', 'wakiso',
    'lugazi', 'kanyanya', 'kasangati', 'mityana', 'bombo', 'kitgum', 'kotido', 'moroto'
  ]
  const kampalaSuburbs = [
    "bugolobi", "bukoto", "buziga", "kabalagala", "kamwokya", "kansanga",
    "kisaasi", "kololo", "kyaliwajjala", "kyanja", "lubaga", "luzira",
    "makindye", "muyenga", "naalya", "naguru", "najjera", "nakasero", "ntinda",
    "bunga", "gaba", "munyonyo", "namuwongo", "kiwatule", "kungu", "buwaate",
    "kiruddu", "salaama", "seguku", "namasuba", "lubowa", "najjanankumbi"
  ]

  const newSeoUrls: MetadataRoute.Sitemap = cities.map(city => ({
    url: `${BASE_URL}/escorts-in/${city}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.95, 
  }))

  const suburbUrls: MetadataRoute.Sitemap = kampalaSuburbs.map(suburb => ({
    url: `${BASE_URL}/escorts-in/kampala/${suburb}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9, 
  }))

  const topCategories = ['thick', 'slim', 'curvy', 'vip', 'massage'];
  const topCities = ['kampala', 'entebbe', 'jinja'];
  
  const categoryUrls: MetadataRoute.Sitemap = topCategories.flatMap(category => 
    topCities.map(city => ({
      url: `${BASE_URL}/${category}-escorts-in/${city}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    }))
  );

  let dynamicUrls: MetadataRoute.Sitemap = []
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, name, updated_at')
      .eq('is_archived', false)

    if (!error && profiles) {
      const slugify = (text: string) => text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      
      dynamicUrls = profiles.map(p => ({
        url: `${BASE_URL}/profile/${slugify(p.name)}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
    }
  } catch (e) {
    console.error('Sitemap generation error:', e)
  }

  return [...staticPages, ...newSeoUrls, ...suburbUrls, ...categoryUrls, ...dynamicUrls]
}
