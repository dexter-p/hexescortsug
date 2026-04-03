import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  if (!params || !params.path || params.path.length === 0) {
    return new NextResponse('Not found', { status: 404 });
  }

  const path = params.path.join('/');
  
  // The Unique Workaround: Route storage fetches through a global free image CDN (wsrv.nl)
  // This bypasses Vercel's 1000 PIC quota and slashes Supabase Egress by caching optimized versions globally.
  const supabaseUrl = `https://zdiosdkoxcimlovewroz.supabase.co/storage/v1/object/public/${path}`;
  const targetUrl = `https://wsrv.nl/?url=${encodeURIComponent(supabaseUrl)}&w=600&output=webp&q=80`;

  try {
    const res = await fetch(targetUrl);
    if (!res.ok) {
      // Fallback to direct fetch if proxy fails
      const fallbackRes = await fetch(supabaseUrl);
      if (!fallbackRes.ok) return new NextResponse('Not found', { status: fallbackRes.status });
      return new NextResponse(fallbackRes.body, {
        headers: {
          'Content-Type': fallbackRes.headers.get('content-type') || 'application/octet-stream',
          'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
        },
      });
    }

    return new NextResponse(res.body, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new NextResponse('Error fetching from upstream', { status: 500 });
  }
}
