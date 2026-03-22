import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/integrations/supabase/middleware'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin-panel')) {
    const url = request.nextUrl.clone()
    url.pathname = '/hx-ctrl-7k9'
    return NextResponse.redirect(url)
  }

  // Determine if this is a hard navigation (full refresh) vs background prefetch
  const isPrefetch = request.headers.has('next-router-prefetch') || request.headers.get('purpose') === 'prefetch';
  const isDocument = request.headers.get('sec-fetch-dest') === 'document' || (!request.headers.has('rsc') && request.headers.get('sec-fetch-mode') === 'navigate');

  let seed = request.cookies.get('shuffle_seed')?.value;
  let newSeedToSet = null;

  // On hard refresh, we generate a fresh seed to trigger a shuffle
  if (isDocument && !isPrefetch) {
    seed = Math.random().toString(36).substring(2, 10);
    newSeedToSet = seed;
  }

  if (seed) {
    request.headers.set('x-shuffle-seed', seed);
  }

  const response = await updateSession(request)

  if (newSeedToSet) {
    response.cookies.set('shuffle_seed', newSeedToSet, { path: '/' });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
