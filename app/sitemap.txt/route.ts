import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const revalidate = 3600; // Refresh sitemap once per hour

export async function GET() {
  const BASE_URL = 'https://www.hexescortsug.xyz'
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const staticPages = [
    `${BASE_URL}/`,
    `${BASE_URL}/about`,
    `${BASE_URL}/faq`,
    `${BASE_URL}/become-escort`,
    `${BASE_URL}/vip`,
    `${BASE_URL}/location`,
  ]

  const cities = [
    'kampala', 'entebbe', 'jinja', 'mbarara', 'gulu', 'fort-portal', 'mbale', 'tororo', 'mukono', 
    'masaka', 'arua', 'lira', 'kasese', 'hoima', 'soroti', 'busia', 'mubende', 'wakiso'
  ]
  const cityUrls = cities.map(city => `${BASE_URL}/location/${city}`)

  let dynamicUrls: string[] = []
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, name')
      .eq('is_archived', false)

    if (error) throw error

    // Simple slugify function for the route handler
    const slugify = (text: string) => text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    if (profiles) {
      dynamicUrls = profiles.map(p => `${BASE_URL}/profile/${slugify(p.name)}`)
    }
  } catch (e) {
    console.error('Sitemap fetch error:', e)
  }

  const allUrls = [...staticPages, ...cityUrls, ...dynamicUrls]
  const content = allUrls.join('\n')

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
    },
  })
}
