import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protect the admin route — redirect to home if not authenticated via Supabase session cookie
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block anyone who tries to guess /admin-panel (old URL)
  if (pathname.startsWith('/admin-panel')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-panel/:path*'],
};
