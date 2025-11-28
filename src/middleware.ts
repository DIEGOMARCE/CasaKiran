import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Obtener la URL actual
  const { pathname } = request.nextUrl;
  
  // Solo proteger rutas de admin
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Verificar si hay una cookie de sesión (sin usar Supabase directamente)
    const sessionCookie = request.cookies.get("sb-access-token");
    
    // Si no hay cookie de sesión, redirigir a login
    if (!sessionCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
