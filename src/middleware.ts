import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/', '/sign-in', '/register', '/verify'];

function getRoleFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
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

  if (!token) {
    if (isPublic) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  const role = getRoleFromToken(token);

  // Logged-in user hitting sign-in/register → send home
  if (isPublic && pathname !== '/' && role) {
    const url = request.nextUrl.clone();
    url.pathname =
      role === 'ADMIN' ? '/admin/dashboard' : role === 'TEACHER' ? '/teacher/dashboard' : '/student/dashboard';
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/admin') && role !== 'ADMIN') {
    const url = request.nextUrl.clone();
    url.pathname = role === 'TEACHER' ? '/teacher/dashboard' : '/student/dashboard';
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/teacher') && role !== 'TEACHER' && role !== 'ADMIN') {
    const url = request.nextUrl.clone();
    url.pathname = role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};