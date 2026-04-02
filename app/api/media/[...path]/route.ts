import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  if (!params || !params.path || params.path.length === 0) {
    return new NextResponse('Not found', { status: 404 });
  }

  const path = params.path.join('/');
  const targetUrl = `https://zdiosdkoxcimlovewroz.supabase.co/storage/v1/object/public/${path}`;

  try {
    const res = await fetch(targetUrl);
    if (!res.ok) {
      return new NextResponse('Not found', { status: res.status });
    }

    return new NextResponse(res.body, {
      headers: {
        'Content-Type': res.headers.get('content-type') || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new NextResponse('Error fetching from upstream', { status: 500 });
  }
}
