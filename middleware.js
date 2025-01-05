import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("next-auth.session-token")?.value;

  console.log(cookieStore);
  const { pathname } = req.nextUrl;

  const restrictedRoutes = ["/login", "/signup"];

  if (cookie && restrictedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!cookie && pathname === "/wishlist") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/wishlist", "/login", "/signup", "/ "],
};
