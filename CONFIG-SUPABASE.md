# ⚡ CONFIGURACIÓN RÁPIDA - 3 PASOS

## 1️⃣ Obtener credenciales (1 minuto)

1. Abre [app.supabase.com](https://app.supabase.com)
2. Tu proyecto "casakiran"
3. **Settings** (⚙️ abajo izquierda) → **API**
4. Copia estos 2 valores:
   - **Project URL** → algo como: `https://abcxyz.supabase.co`
   - **anon public** key → algo como: `eyJhbGciOi...`

---

## 2️⃣ Crear archivo .env.local

En la carpeta raíz del proyecto (donde está `package.json`), crea un archivo llamado:

```
.env.local
```

Y pega esto dentro:

```
NEXT_PUBLIC_SUPABASE_URL=PEGA_TU_URL_AQUI
NEXT_PUBLIC_SUPABASE_ANON_KEY=PEGA_TU_KEY_AQUI
```

Reemplaza con tus valores reales.

---

## 3️⃣ Reiniciar servidor

En la terminal:
- Ctrl+C (parar)
- `npm run dev` (reiniciar)

---

## ✅ ¡LISTO!

Ya NO verás productos falsos nunca más. Solo verás lo que está en tu Supabase real.

---

## 🗄️ Ahora configura tu base de datos

Ve al archivo `SETUP-RAPIDO.md` y sigue los 3 pasos para crear las tablas.
