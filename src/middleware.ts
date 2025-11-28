import authConfig from './auth.config';
import NextAuth from 'next-auth';
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from './routes';
import { NextResponse } from 'next/server';
import { PAGES } from './configs/pages.config';

const { auth } = NextAuth(authConfig);

export const middleware = auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null;

  const safeNewUrl = (pathOrUrl: string) => {
    try {
      return new URL(pathOrUrl, nextUrl.origin || req.url);
    } catch (err) {
      // last resort: build from Host header
      const host =
        req.headers.get('host') || (nextUrl && nextUrl.hostname) || '';
      const proto = req.headers.get('x-forwarded-proto') || 'https';
      try {
        return new URL(pathOrUrl, `${proto}://${host}`);
      } catch (err2) {
        // give up — return null so caller can handle
        return null;
      }
    }
  };

  if (isAuthRoute) {
    if (isLoggedIn) {
      const target = safeNewUrl(DEFAULT_LOGIN_REDIRECT);
      if (target) return NextResponse.redirect(target);
      return NextResponse.redirect('/');
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) callbackUrl += nextUrl.search;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    const signInUrlStr = `${PAGES.SIGN_IN}?callbackUrl=${encodedCallbackUrl}`;
    const target = safeNewUrl(signInUrlStr);
    if (target) return NextResponse.redirect(target);
    return NextResponse.redirect(
      `${PAGES.SIGN_IN}?callbackUrl=${encodedCallbackUrl}`
    );
  }

  return null;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
