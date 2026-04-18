import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

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

  const cities = ['kampala', 'entebbe', 'jinja', 'mbarara', 'gulu', 'fort-portal', 'mbale', 'tororo', 'mukono']
  const cityUrls = cities.map(city => `${BASE_URL}/location/${city}`)

  let dynamicUrls: string[] = []
  try {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id')
      .eq('is_archived', false)

    if (profiles) {
      dynamicUrls = profiles.map(p => `${BASE_URL}/profile/${p.id}`)
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
