import { NextRequest, NextResponse } from "next/server";

const socialMedia = [
  {
    name: "github",
    url: "https://github.com/sherbolotarbaev",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/sherbolotarbaev",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/sherbolotarbaev",
  },
  {
    name: "telegram",
    url: "https://telegram.me/sherbolotarbaev",
  },
  {
    name: "twitter",
    url: "https://twitter.com/sherbolotarbaev",
  },
];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  const searchParams = new URLSearchParams(url.searchParams);
  const token = searchParams.get("token");
  const pathname = url.pathname;

  if (pathname === "/redirect") {
    if (token) {
      response.cookies.set("token_client", token);
    }

    return response;
  }

  const isSocialMedia =
    socialMedia.find((s) => s.name === pathname.replace("/", "")) || null;

  if (isSocialMedia) {
    const redirectUrl = new URL(
      `/redirect?to=${decodeURIComponent(isSocialMedia.url)}`,
      url
    );
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|favicon.ico).*)",
};
