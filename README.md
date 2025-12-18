# Galaksio Waitlist

Landing page tipo waitlist para Galaksio - On-chain USDC meets Cloud Compute.

## 🚀 Características

- ✨ Landing page moderno con diseño inspirado en el original
- 📧 Sistema de captura de emails con validación
- 💾 Almacenamiento local en JSON
- 📊 Exportación a CSV
- 🔗 Exportación a Notion (opcional)
- 🎨 Construido con Next.js 14, TypeScript y Shadcn UI

## 📋 Requisitos

- Node.js 18+ o superior
- npm o yarn

## 🛠️ Instalación

1. Instala las dependencias:

```bash
npm install
```

2. Inicia el servidor de desarrollo:

```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
.
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # API endpoint para el waitlist
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Landing page principal
├── components/
│   └── ui/                       # Componentes de Shadcn UI
│       ├── button.tsx
│       └── input.tsx
├── scripts/
│   ├── export-csv.js            # Script de exportación a CSV
│   └── export-notion.js         # Script de exportación a Notion
├── data/
│   └── waitlist.json            # Almacenamiento de emails (se crea automáticamente)
├── lib/
│   └── utils.ts
└── README.md
```

## 📧 Gestión de Emails

### Ver emails registrados

Los emails se guardan en **Vercel KV (Redis)**. Para verlos:

**En producción (API GET):**
```bash
curl https://tu-proyecto.vercel.app/api/waitlist
```

**Desde el dashboard de Vercel:**
1. Ve a tu proyecto → Storage → tu KV database
2. Pestaña "Data"
3. Busca las keys: `waitlist:emails`, `waitlist:count`

**En desarrollo local:**
```bash
# Primero configura las variables de entorno (ver DEPLOY.md)
npm run dev
curl http://localhost:3000/api/waitlist
```

### Exportar a CSV

```bash
node scripts/export-csv.js
```

Esto creará un archivo `data/waitlist.csv` con todos los emails.

### Exportar a Notion (Opcional)

1. Crea una integración en Notion: https://www.notion.so/my-integrations
2. Crea una base de datos en Notion con estas propiedades:
   - **Email** (tipo: Email)
   - **Timestamp** (tipo: Date)
   - **User Agent** (tipo: Text)
3. Comparte la base de datos con tu integración
4. Ejecuta el script:

```bash
NOTION_API_KEY=tu_api_key NOTION_DATABASE_ID=tu_database_id node scripts/export-notion.js
```

## 🎨 Personalización

### Colores y Estilos

Los colores principales están definidos en `app/globals.css` y siguen el esquema del diseño original:
- Azul oscuro (`blue-950`) para elementos principales
- Degradados de azul a gris para títulos destacados
- Bordes y fondos en tonos zinc/slate

### Contenido

Edita el contenido en `app/page.tsx`:
- Título y descripción principal
- Secciones de características
- Pasos del "How It Works"

## 🚢 Despliegue

### Vercel (Recomendado)

**Ver la guía completa de deploy:** [DEPLOY.md](DEPLOY.md)

**Resumen rápido:**
1. Sube a GitHub y conecta en Vercel
2. Deploy (automático)
3. En Vercel → Storage → Create Database → KV
4. ¡Listo! Los emails se guardan en Redis

Los emails se guardan en **Vercel KV (Redis)** - gratis hasta 256MB.

## 📝 Notas

- El sistema actual guarda emails en un archivo JSON local
- Para producción, se recomienda migrar a una base de datos
- El formulario incluye validación de email básica
- Los emails duplicados son rechazados automáticamente

## 🤝 Contribuciones

Este es un proyecto personalizado para Galaksio. Para sugerencias o mejoras, contacta al equipo.

## 📄 Licencia

Privado - Todos los derechos reservados Galaksio 2025
