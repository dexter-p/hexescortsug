import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect the admin route — redirect to home if not authenticated via Supabase session cookie
  if (pathname.startsWith('/admin-panel')) {
    return NextResponse.redirect(new URL('/hx-ctrl-7k9', request.url));
  }

  // SEO Redirect: Old /location/ routes to new /escorts-in/ routes
  if (pathname.startsWith('/location/')) {
    const newPath = pathname.replace('/location/', '/escorts-in/');
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  // SEO Rewrite: /thick-escorts-in/kampala -> /category/thick/kampala
  const categoryMatch = pathname.match(/^\/([a-z0-9-]+)-escorts-in\/(.+)$/i);
  if (categoryMatch) {
    const category = categoryMatch[1];
    const location = categoryMatch[2];
    return NextResponse.rewrite(new URL(`/category/${category}/${location}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin-panel/:path*', 
    '/hx-ctrl-7k9/:path*',
    '/:path*' // Match all to enable the rewrite
  ], 
};
