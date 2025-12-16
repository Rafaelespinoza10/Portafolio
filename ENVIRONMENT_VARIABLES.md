# Variables de Entorno para Cloudflare Pages

Este proyecto usa variables de entorno para configurar las APIs y servicios externos de forma segura.

## Variables Requeridas

Configura estas variables en Cloudflare Pages (Settings → Environment variables):

### EmailJS
- `EMAILJS_SERVICE_ID`: Tu service ID de EmailJS
- `EMAILJS_TEMPLATE_ID`: Tu template ID de EmailJS  
- `EMAILJS_PUBLIC_KEY`: Tu public key de EmailJS
- `EMAILJS_PRIVATE_KEY`: Tu private key de EmailJS

### Formspree
- `FORMSPREE_ENDPOINT`: Tu endpoint de Formspree (ej: `https://formspree.io/f/mzzjlzkn`)

### Firebase
- `FIREBASE_API_KEY`: Tu API key de Firebase
- `FIREBASE_AUTH_DOMAIN`: Tu auth domain de Firebase
- `FIREBASE_DATABASE_URL`: Tu database URL de Firebase
- `FIREBASE_PROJECT_ID`: Tu project ID de Firebase
- `FIREBASE_STORAGE_BUCKET`: Tu storage bucket de Firebase
- `FIREBASE_MESSAGING_SENDER_ID`: Tu messaging sender ID de Firebase
- `FIREBASE_APP_ID`: Tu app ID de Firebase
- `FIREBASE_MEASUREMENT_ID`: Tu measurement ID de Firebase

## Cómo Configurar en Cloudflare Pages

1. Ve a tu proyecto en Cloudflare Pages
2. Haz clic en **Settings** → **Environment variables**
3. Agrega cada variable para **Production** y **Preview** (opcional)
4. Haz clic en **Save**

## Nota

Si no configuras estas variables, el script usará valores por defecto del archivo `environment.ts` local. 
**Para mayor seguridad, configura todas las variables en Cloudflare Pages.**

