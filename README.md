# Casa Kiran - Tienda de Velas Artesanales 🕯️

Sitio web de e-commerce para Casa Kiran, una tienda de velas artesanales.

## ✨ Características

- **Catálogo de productos** con filtros por categoría
- **Carrito de compras** con persistencia en localStorage
- **Pedidos vía WhatsApp** - el cliente envía su pedido directo al WhatsApp
- **Panel de administración** para gestionar productos y categorías
- **Diseño responsivo** y minimalista
- **Optimizado para SEO**

## 🛠️ Tecnologías

- **Frontend:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS
- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** Supabase Auth
- **Storage:** Supabase Storage (imágenes)
- **Hosting:** Vercel

---

## 🚀 Configuración Inicial

### 1. Crear proyecto en Supabase

1. Ve a [https://app.supabase.com](https://app.supabase.com)
2. Crea una cuenta o inicia sesión
3. Clic en "New Project"
4. Elige un nombre y contraseña para la base de datos
5. Selecciona la región más cercana
6. Espera a que se cree el proyecto (~2 minutos)

### 2. Configurar la base de datos

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Copia y pega todo el contenido del archivo `supabase-schema.sql`
3. Ejecuta el script (botón "Run")

### 3. Crear el bucket de imágenes

1. Ve a **Storage** en el menú lateral
2. Clic en "New bucket"
3. Nombre: `product-images`
4. Marca la opción "Public bucket"
5. Clic en "Create bucket"

### 4. Crear usuario administrador

1. Ve a **Authentication** > **Users**
2. Clic en "Add user" > "Create new user"
3. Ingresa el email y contraseña del administrador
4. Clic en "Create user"

### 5. Obtener las API Keys

1. Ve a **Settings** > **API**
2. Copia los siguientes valores:
   - **Project URL** (ej: `https://xxxxx.supabase.co`)
   - **anon public** key

### 6. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

### 7. Personalizar la configuración del sitio

Edita el archivo `src/lib/config.ts` con los datos de tu cliente:

```typescript
export const siteConfig = {
  name: "Casa Kiran",
  whatsapp: "+52XXXXXXXXXX", // Número real de WhatsApp
  instagram: "https://instagram.com/casakiran",
  facebook: "https://facebook.com/casakiran",
  email: "contacto@casakiran.com",
  // ... más configuraciones
};
```

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

---

## 🌐 Despliegue en Vercel

### Opción 1: Desde GitHub

1. Sube el proyecto a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com) e inicia sesión
3. Clic en "New Project"
4. Importa el repositorio de GitHub
5. En "Environment Variables", agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Clic en "Deploy"

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── admin/           # Panel de administración
│   │   ├── (dashboard)/ # Dashboard, productos, categorías
│   │   └── login/       # Página de login
│   ├── catalogo/        # Catálogo de productos
│   ├── contacto/        # Página de contacto
│   ├── nosotros/        # Página "Sobre nosotros"
│   ├── producto/[id]/   # Detalle de producto
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página de inicio
├── components/
│   ├── cart/            # Componentes del carrito
│   ├── layout/          # Header, Footer
│   ├── products/        # Cards y grids de productos
│   └── ui/              # Componentes UI reutilizables
├── context/
│   └── CartContext.tsx  # Estado global del carrito
├── lib/
│   ├── config.ts        # Configuración del sitio
│   └── supabase/        # Cliente de Supabase
└── types/
    └── index.ts         # Tipos TypeScript
```

---

## 🔧 Panel de Administración

Accede al panel en `/admin`

### Funcionalidades:
- **Dashboard:** Vista general con estadísticas
- **Productos:** Crear, editar, eliminar productos
- **Categorías:** Gestionar categorías de productos

### Para agregar un producto:
1. Ve a `/admin/productos`
2. Clic en "+ Nuevo producto"
3. Completa el formulario
4. Sube una imagen
5. Clic en "Crear producto"

---

## 🛒 Flujo de Compra

1. El cliente navega el catálogo
2. Agrega productos al carrito
3. Revisa su carrito
4. Clic en "Enviar pedido por WhatsApp"
5. Se abre WhatsApp con el mensaje del pedido
6. El cliente y la tienda coordinan el pago y envío

---

## 📝 Personalización

### Cambiar colores
Edita `tailwind.config.ts` y `src/app/globals.css`

### Cambiar textos
Edita `src/lib/config.ts` para información del negocio

### Cambiar logo
Reemplaza el favicon en `src/app/favicon.ico`
Y agrega el logo en el Header si es necesario

---

## 🆘 Solución de Problemas

### "Supabase no configurado"
- Verifica que las variables de entorno estén correctas
- Reinicia el servidor de desarrollo

### "Error al subir imagen"
- Verifica que el bucket `product-images` exista
- Verifica que sea público

### "No puedo iniciar sesión en admin"
- Verifica que el usuario exista en Supabase Auth
- Verifica las credenciales

---

## 📞 Soporte

Para soporte técnico, contacta al desarrollador.

---

**Hecho con ❤️ para Casa Kiran**
