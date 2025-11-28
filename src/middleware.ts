import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Solo verificar rutas de admin (excepto login)
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Verificar si hay cookies de sesión de Supabase
    const cookies = request.cookies;
    const hasAuthCookie =
      cookies.has("sb-ncweefuufbkrquzmmgma-auth-token") ||
      cookies.getAll().some(cookie => cookie.name.startsWith("sb-") && cookie.name.includes("auth-token"));

    // Si no hay cookie de autenticación, redirigir a login
    if (!hasAuthCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
