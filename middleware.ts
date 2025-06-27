import NextAuth, { NextAuthConfig } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import { PROTECTED_SUB_ROUTES, PUBLIC_ROUTES } from "./constants/routes";

const { auth } = NextAuth(authConfig as NextAuthConfig);
const checkIfPublicRoute = (pathname: string): boolean => {
  // If the pathname includes any protected sub-route, it's NOT public
  for (const subRoute of Object.values(PROTECTED_SUB_ROUTES)) {
    if (pathname.includes(subRoute)) {
      return false;
    }
  }
  // Otherwise, check if it's a public route
  return Object.values(PUBLIC_ROUTES).some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );
};

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  console.log(session);
  console.log("Middleware");

  const isAuthenticated = !!session?.user;

  const isPublicRoute = checkIfPublicRoute(nextUrl.pathname);

  console.log(isAuthenticated, isPublicRoute);

  if (!isAuthenticated && !isPublicRoute) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);

    return NextResponse.redirect(
      new URL(`${PUBLIC_ROUTES.login}?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|api/trpc|api/register|_next/static|_next/image|favicon.ico).*)",
  ],
};
