import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If anyone tries to access the old /admin path, redirect them to the homepage.
  // This effectively disables the old, insecure path.
  if (pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // The rest of the logic is for the new, secure admin path.
  const session = request.cookies.get('auth_session')?.value
  const isAuthPage = pathname === '/huseyntahirov2009@bioscriptadmin/login'

  // If trying to access a protected page without a session, redirect to login.
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/huseyntahirov2009@bioscriptadmin/login', request.url))
  }

  // If already logged in and trying to access the login page, redirect to the dashboard.
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/huseyntahirov2009@bioscriptadmin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Apply this middleware to both the old /admin path (to block it) 
  // and the new secure path (to protect it).
  matcher: ['/admin/:path*', '/huseyntahirov2009@bioscriptadmin/:path*'],
}
