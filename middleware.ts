import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = new URLSearchParams(url.searchParams);
  const xff = `${request.headers.get('x-forwarded-for')?.split(',')[0]}`;

  const responseCookies = response.cookies;
  const requestCookies = request.cookies;
  const session = requestCookies.get('session');

  const next = decodeURIComponent(searchParams.get('next') ?? '/guestbook');

  if (pathname === '/redirect') {
    return response;
  }

  let user: User | undefined;

  if (session) {
    const headers = new Headers();

    headers.append('x-forwarded-for', xff);
    headers.append('cookie', `session=${session.value}`);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        method: 'GET',
        headers,
      });

      const me = await response.json();

      if (me.statusCode === 401 || me.statusCode === 403) {
        responseCookies.delete(session);
      }

      if (me.email) {
        user = me;
      }
    } catch (_) {}
  }

  if (user && user.isActive && pathname === '/sign-in') {
    const redirectUrl = new URL(`/redirect?to=${next}`, url);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ['/sign-in', '/guestbook'],
};
