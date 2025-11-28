# 🚀 SETUP COMPLETO - 5 MINUTOS

## PASO 1: Configurar variables de entorno

Sigue la guía: **CONFIG-SUPABASE.md** (3 minutos)

**Esto es OBLIGATORIO.** Sin esto el proyecto no funciona.

---

## PASO 2: Crear tablas en Supabase

1. Ve a [app.supabase.com](https://app.supabase.com)
2. Tu proyecto "casakiran" → **SQL Editor**
3. Click **"+ New query"**
4. Copia TODO el archivo `supabase-schema.sql`
5. Pégalo y click **RUN** ✅

**Resultado:** "Success. No rows returned"

---

## PASO 3: Crear bucket para imágenes

1. En Supabase → **Storage**
2. **"New bucket"**
3. Nombre: `product-images`
4. ✅ Marcar "Public bucket"
5. **"Create bucket"** ✅

---

## PASO 4: Crear tu usuario admin

1. En Supabase → **Authentication**
2. **"Add user"** → **"Create new user"**
3. Email: `diegosanhueza@hotmail.es`
4. Password: (elige una)
5. ✅ Marcar "Auto Confirm User"
6. **"Create user"** ✅

---

## ✅ ¡LISTO!

Ahora ve a tu sitio:

1. `/admin/login` → Inicia sesión
2. Crea categorías
3. Crea productos

**Ya NO verás productos falsos. Solo verás lo real.**
