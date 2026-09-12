import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/', '/sign-in', '/sign-up', '/verify', '/forgot-password', '/reset-password'];

function getRoleFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return payload.role ?? null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const legacy: Record<string, string> = {
    '/dashboard': '/student/dashboard',
    '/courses': '/student/courses',
    '/lesson': '/student/lesson',
  };
  if (legacy[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = legacy[pathname];
    return NextResponse.redirect(url);
  }

  const isPublic = publicRoutes.includes(pathname);
  const role = token ? getRoleFromToken(token) : null;

  if (isPublic) {
    if (role && pathname !== '/') {
      const url = request.nextUrl.clone();
      url.pathname =
        role === 'ADMIN'
          ? '/admin/dashboard'
          : role === 'TEACHER'
          ? '/teacher/dashboard'
          : '/student/dashboard';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!role) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/admin') && role !== 'ADMIN') {
    const url = request.nextUrl.clone();
    url.pathname = role === 'TEACHER' ? '/teacher/dashboard' : '/student/dashboard';
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/teacher') && role !== 'TEACHER' && role !== 'ADMIN') {
    const url = request.nextUrl.clone();
    url.pathname = '/student/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};