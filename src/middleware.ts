import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = new URLSearchParams(url.searchParams);
  const responseCookies = response.cookies;
  const requestCookies = request.cookies;
  const os = request.headers.get("sec-ch-ua-platform");
  const xff = `${request.headers.get("x-forwarded-for")?.split(",")[0]}`;

  const socialMedia = [
    {
      name: "github",
      url: "https://github.com/arbaevsherbolot",
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
  ];

  const isSocialMedia =
    socialMedia.find((s) => s.name === pathname.replace("/", "")) || null;

  if (isSocialMedia) {
    return NextResponse.redirect(isSocialMedia.url);
  }

  if (!requestCookies.get("os")) {
    responseCookies.set("os", `${os}`);
    requestCookies.set("xff", `${xff}`);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|favicon.ico).*)",
};
