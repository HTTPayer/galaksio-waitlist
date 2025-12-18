# 🚀 Deploy en Vercel - Guía Rápida

## Paso 1: Subir a GitHub

```bash
git init
git add .
git commit -m "Initial commit - Galaksio Waitlist"
gh repo create galaksio-waitlist --private --source=. --push
```

O manualmente:
1. Crea un repo en GitHub
2. `git remote add origin <tu-repo-url>`
3. `git push -u origin main`

## Paso 2: Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New" → "Project"
3. Importa tu repo de GitHub
4. Click "Deploy" (¡Ya está!)

## Paso 3: Configurar Vercel KV (Base de Datos)

Después del primer deploy:

1. En tu proyecto en Vercel, ve a la pestaña **Storage**
2. Click en **Create Database**
3. Selecciona **KV** (Redis)
4. Dale un nombre (ej: `galaksio-waitlist-kv`)
5. Click **Create**

**¡Listo!** Vercel automáticamente conecta las variables de entorno.

## Verificar que funciona:

1. Ve a tu sitio: `https://tu-proyecto.vercel.app`
2. Prueba el formulario de waitlist
3. Verifica los emails en: `https://tu-proyecto.vercel.app/api/waitlist`

## Ver los emails capturados:

**Opción 1 - API:**
```bash
curl https://tu-proyecto.vercel.app/api/waitlist
```

**Opción 2 - Vercel CLI:**
```bash
npm i -g vercel
vercel env pull .env.local
npm run dev
# Ahora puedes ver en: http://localhost:3000/api/waitlist
```

**Opción 3 - Vercel KV Dashboard:**
1. Ve a Storage → tu KV database
2. Pestaña "Data"
3. Busca las keys: `waitlist:emails`, `waitlist:count`

## Desarrollo Local (Opcional):

Si quieres probar localmente antes de deploy:

1. Crea el KV database en Vercel (paso 3)
2. En tu proyecto Vercel → Settings → Environment Variables
3. Copia `KV_REST_API_URL` y `KV_REST_API_TOKEN`
4. Créalas en `.env.local`:
   ```
   KV_REST_API_URL=your_url_here
   KV_REST_API_TOKEN=your_token_here
   ```
5. `npm install && npm run dev`

## ✅ Todo listo!

Ahora tienes:
- ✨ Landing page en producción
- 💾 Base de datos Redis persistente
- 📧 Sistema de captura de emails funcionando
- 🚀 Deploy automático con cada push a GitHub

---

**Costo:** $0/mes (plan gratuito de Vercel incluye KV con 256MB)
