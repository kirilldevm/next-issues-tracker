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
  const url = req.nextUrl;
  const pathname = url.pathname;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isApiAuthRoute) return NextResponse.next();

  // logged in and tries to visit /signin or /signup → redirect
  if (isAuthRoute && isLoggedIn) {
    const redirectUrl = `${url.origin}${DEFAULT_LOGIN_REDIRECT}`;
    return NextResponse.redirect(redirectUrl);
  }

  // not logged in and trying to access a protected route
  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = url.pathname + url.search;
    const redirectUrl = `${url.origin}${
      PAGES.SIGN_IN
    }?callbackUrl=${encodeURIComponent(callbackUrl)}`;

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
