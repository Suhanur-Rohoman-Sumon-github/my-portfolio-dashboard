import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the accessToken from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
console.log("Cookies:", request.cookies.getAll());
  console.log("Access Token:", accessToken); // Debugging to check if the token exists

  const isProtectedRoute = !["/login", "/register"].includes(pathname); // Adjusted to check for auth routes

  // Redirect unauthenticated users to login for protected routes
  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  // Redirect authenticated users away from login/register routes
  const isAuthRoute = ["/login", "/register"].includes(pathname);
  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // Protect the root route
    "/cart",
    "/wishList",
    "/vendor/:path*",
    "/admin/:path*",
  ],
};
