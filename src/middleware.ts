import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "../i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import jwt from "jsonwebtoken";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  return matchLocale(languages, locales, i18n.defaultLocale);
}

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("auth_token")?.value;
  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET!); // replace with your secret
    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static/public files and folders (images, fonts, etc.)
  const PUBLIC_FILE = /\.(.*)$/;
  const STATIC_PATHS = [
    "/manifest.json",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
  ];
  // Add folders to skip (images, fonts, etc.)
  const STATIC_PREFIXES = [
    "/images/",
    "/fonts/",
    "/css/",
    "/js/",
    "/_next/",
    "/public/",
  ];

  if (
    STATIC_PATHS.includes(pathname) ||
    (PUBLIC_FILE.test(pathname) &&
      STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix)))
  ) {
    return NextResponse.next();
  }

  // Skip authentication routes (login/register/etc.)
  if (pathname.startsWith("/authentication")) {
    return NextResponse.next();
  }

  // Locale check (after auth)
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    // ✅ Always check auth for everything else
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(
        new URL(`/${locale}/authentication`, request.url)
      );
    }
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
