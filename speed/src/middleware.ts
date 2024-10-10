import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // Example: Check for a token or session

  // If there's no token and the user is not on the login page or the home page, redirect to login
  if (!token && !request.nextUrl.pathname.startsWith('/login') && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to proceed if authenticated or already on the login page or the home page
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/search/:path*',
    '/submission/:path*',
    '/articles_saved/:path*',
    '/analyse_article/:path*',
    '/moderate_article/:path*',
    '/',
  ], 
};