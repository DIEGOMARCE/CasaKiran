# 🛠️ Guía de Desarrollo - Casa Kiran

Esta guía documenta los errores comunes y las mejores prácticas para evitar problemas de compilación y despliegue en Vercel.

---

## 📋 Índice

1. [Errores Comunes y Soluciones](#-errores-comunes-y-soluciones)
2. [Problema de Puertos Ocupados](#-problema-de-puertos-ocupados)
3. [TypeScript - Mejores Prácticas](#-typescript---mejores-prácticas)
4. [Middleware y Edge Runtime](#-middleware-y-edge-runtime)
5. [Supabase con Next.js](#-supabase-con-nextjs)
6. [Checklist Pre-Deploy](#-checklist-pre-deploy)
7. [Comandos Útiles](#-comandos-útiles)

---

## 🚨 Errores Comunes y Soluciones

### 1. Error: `Unexpected any. Specify a different type`

**Problema:** ESLint no permite usar el tipo `any` en TypeScript.

```typescript
// ❌ MALO - Causa error de compilación
categories.map((category: any) => ...)

// ✅ BUENO - Usar tipos definidos
import { Category } from "@/types";
categories.map((category: Category) => ...)
```

**Solución:**
- Siempre importar y usar los tipos definidos en `/src/types/index.ts`
- Si necesitas un nuevo tipo, agrégalo al archivo de tipos

---

### 2. Error: `Node.js API not supported in Edge Runtime`

**Problema:** El middleware de Next.js usa Edge Runtime, que no soporta todas las APIs de Node.js.

```typescript
// ❌ MALO - Supabase usa APIs de Node.js
import { createServerClient } from "@supabase/ssr";
// En middleware.ts - CAUSA ERROR

// ✅ BUENO - Verificación simple sin Supabase
const sessionCookie = request.cookies.get("sb-access-token");
```

**Solución:**
- NO usar Supabase directamente en `middleware.ts`
- Usar verificación de cookies simple para proteger rutas
- Mover la lógica de autenticación completa a Server Components

---

### 3. Error: `ENOENT: no such file or directory` (caché de webpack)

**Problema:** Caché de build corrupta.

**Solución:**
```powershell
# PowerShell
Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue
npm run build
```

---

### 4. Problema: `Port 3000 is in use, trying 3001 instead...`

**Problema:** Next.js intenta usar el puerto 3000, pero está ocupado, entonces usa 3001, luego 3002, etc.

**Causa:** Procesos de Node.js anteriores no se cerraron correctamente y siguen ocupando los puertos.

**Solución Rápida:**
```powershell
# Usar el script automático
.\limpiar-puertos.ps1
```

**Solución Manual:**
```powershell
# 1. Ver qué procesos están usando los puertos
Get-NetTCPConnection -LocalPort 3000,3001,3002 | Select-Object LocalPort, OwningProcess

# 2. Cerrar los procesos (reemplaza PID con el número del proceso)
Stop-Process -Id [PID] -Force

# O cerrar todos los procesos de Node.js
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

**Prevención:**
- Siempre cierra el servidor con `Ctrl+C` en la terminal
- Usa `.\limpiar-puertos.ps1` antes de iniciar el servidor si hay problemas
- Considera usar un puerto fijo en `package.json` si es necesario

---

## 📘 TypeScript - Mejores Prácticas

### Tipos Disponibles en el Proyecto

Los tipos están definidos en `/src/types/index.ts`:

```typescript
// Productos
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  category?: Category;
  stock: number;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Categorías
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

// Carrito
interface CartItem {
  product: Product;
  quantity: number;
}
```

### Reglas de Oro

1. **Nunca usar `any`** - Siempre definir tipos específicos
2. **Importar tipos** - `import { Product, Category } from "@/types";`
3. **Crear nuevos tipos** - Si necesitas uno nuevo, agrégalo a `/src/types/index.ts`

---

## 🔒 Middleware y Edge Runtime

### ⚠️ Limitaciones del Edge Runtime

El Edge Runtime de Next.js NO soporta:
- `process.versions`
- `process.version`
- Módulos de Node.js (`fs`, `path`, etc.)
- Algunas dependencias como Supabase completo

### Estructura Correcta del Middleware

```typescript
// src/middleware.ts
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Proteger rutas de admin
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // ✅ Verificar cookie simple - SIN Supabase
    const sessionCookie = request.cookies.get("sb-access-token");
    
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

---

## 🗄️ Supabase con Next.js

### Dónde usar cada cliente

| Archivo | Usar en | Descripción |
|---------|---------|-------------|
| `/lib/supabase/client.ts` | Componentes Cliente (`"use client"`) | Para interacciones en el navegador |
| `/lib/supabase/server.ts` | Server Components, Route Handlers | Para operaciones del servidor |
| ❌ NO usar en `middleware.ts` | - | Causa errores de Edge Runtime |

### Ejemplo de uso correcto

```typescript
// En Server Component (page.tsx)
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*");
  // ...
}
```

```typescript
// En Client Component
"use client";
import { createClient } from "@/lib/supabase/client";

export default function Component() {
  const supabase = createClient();
  // ...
}
```

---

## ✅ Checklist Pre-Deploy

Antes de hacer deploy a Vercel, verifica:

### 1. Build Local Exitoso
```powershell
# Limpiar caché
Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue

# Ejecutar build
npm run build
```

### 2. Sin Errores de TypeScript
- [ ] No hay uso de `any`
- [ ] Todos los tipos están importados correctamente
- [ ] No hay errores en la terminal

### 3. Variables de Entorno
- [ ] `.env.local` tiene las variables necesarias
- [ ] Las variables están configuradas en Vercel Dashboard

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
```

### 4. Middleware Compatible
- [ ] No usa Supabase directamente
- [ ] Solo usa APIs compatibles con Edge Runtime

### 5. Dependencias Actualizadas
```powershell
# Verificar vulnerabilidades
npm audit

# Actualizar dependencias menores
npm update
```

---

## 💻 Comandos Útiles

```powershell
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint

# Limpiar puertos ocupados (IMPORTANTE si ves "Port 3000 is in use")
.\limpiar-puertos.ps1

# Limpiar caché de build
Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue

# Limpiar node_modules y reinstalar
Remove-Item -Path node_modules -Recurse -Force
npm install

# Ver versión de Node.js
node -v
# Recomendado: v20.x o superior

# Cerrar todos los procesos de Node.js (último recurso)
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

---

## 📝 Notas Adicionales

### Advertencia de Node.js
Si ves este warning:
```
Node.js 18 and below are deprecated...
```

**No es crítico**, pero se recomienda actualizar a Node.js 20+:
- Descargar desde: https://nodejs.org/
- Vercel usa Node.js 20 por defecto

### Estructura de Carpetas

```
src/
├── app/                 # Páginas y rutas (App Router)
│   ├── admin/          # Panel de administración
│   ├── catalogo/       # Catálogo de productos
│   └── ...
├── components/         # Componentes reutilizables
│   ├── cart/          # Componentes del carrito
│   ├── layout/        # Header, Footer
│   ├── products/      # Componentes de productos
│   └── ui/            # Componentes UI genéricos
├── context/           # React Context (CartContext)
├── lib/               # Utilidades y configuración
│   └── supabase/      # Clientes de Supabase
├── types/             # Definiciones de TypeScript
└── middleware.ts      # Middleware de Next.js
```

---

## 🆘 ¿Problemas?

1. **Puertos ocupados** - Ejecutar `.\limpiar-puertos.ps1` antes de `npm run dev`
2. **Limpiar caché** - Eliminar `.next` y volver a compilar
3. **Revisar tipos** - Verificar que no haya `any`
4. **Verificar middleware** - Asegurar que no use Supabase
5. **Revisar variables de entorno** - Confirmar que existen en `.env.local` y Vercel

---

*Última actualización: Noviembre 2025*


