import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // Routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/courses',
    '/lesson',
    '/teacher',
    '/admin',
  ];

  // Public routes (auth pages)
  const publicRoutes = ['/sign-in', '/sign-up'];

  // Check if user is trying to access a protected route without a token
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Check if user is already logged in and trying to access auth pages
  if (publicRoutes.some(route => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which routes should be protected by this middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/courses/:path*',
    '/lesson/:path*',
    '/teacher/:path*',
    '/admin/:path*',
    '/sign-in',
    '/sign-up',
  ],
};