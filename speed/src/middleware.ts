import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // Check for a token in the cookies
  const roleCookie = request.cookies.get("role"); // Get the role cookie, which might return undefined

  // Safely extract the value of the role from the cookie (if it exists)
  const role = roleCookie ? roleCookie.value : undefined;

  // Redirect to login page if the token is missing
  if (
    !token &&
    !request.nextUrl.pathname.startsWith("/login") &&
    request.nextUrl.pathname !== "/"
  ) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin)); // Use the origin
  }

  // If accessing the moderator page, ensure the user has a moderator role
  if (request.nextUrl.pathname.startsWith("/moderate_article")) {
    if (role !== "moderator") {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin)); // Redirect to home if not a moderator
    }
  }

  if (request.nextUrl.pathname.startsWith("/analyse_article")) {
    if (role !== "analyst") {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin)); // Redirect to home if not a moderator
    }
  }

  // Allow the request to proceed if authenticated or already on the login page or the home page
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/search/:path*",
    "/submission/:path*",
    "/articles_saved/:path*",
    "/analyse_article/:path*",
    "/moderate_article/:path*", // Protected for moderators only
    "/",
  ],
};
