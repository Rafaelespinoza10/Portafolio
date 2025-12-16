# Guía de Despliegue en Cloudflare Pages

## Paso 1: Preparar el proyecto

Tu proyecto ya está listo. Asegúrate de que:
- ✅ El archivo `_redirects` está en la raíz del proyecto
- ✅ El archivo `.npmrc` está configurado (ya creado con `legacy-peer-deps=true`)
- ✅ El build de producción funciona: `npm run build`

## Paso 2: Subir tu código a GitHub

Si aún no lo has hecho:
1. Crea un repositorio en GitHub
2. Sube tu código:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```

## Paso 3: Configurar Cloudflare Pages

1. **Ve a Cloudflare Dashboard**
   - Accede a: https://dash.cloudflare.com/
   - Inicia sesión con tu cuenta

2. **Ir a Pages**
   - En el menú lateral, haz clic en "Pages"
   - O ve directamente a: https://dash.cloudflare.com/?to=/:account/pages

3. **Crear un nuevo proyecto**
   - Haz clic en "Create a project"
   - Selecciona "Connect to Git"
   - Autoriza Cloudflare para acceder a tu GitHub
   - Selecciona tu repositorio

4. **Configurar el build**
   - **Framework preset**: `Angular`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist/persona-project/browser`
     - ✅ Esta es la ruta correcta verificada en tu proyecto
   - **Root directory**: `/` (dejar por defecto)
   - **Environment variables**: (opcional, si necesitas variables de entorno)

5. **Hacer clic en "Save and Deploy"**

## Paso 4: Configurar tu dominio personalizado

1. **En el proyecto de Pages**
   - Ve a tu proyecto recién creado
   - Haz clic en la pestaña "Custom domains"
   - Haz clic en "Set up a custom domain"
   - Ingresa tu dominio (ej: `tudominio.com` o `www.tudominio.com`)

2. **Configurar DNS en Cloudflare**
   - Cloudflare detectará automáticamente el dominio si está en Cloudflare
   - Si no está en Cloudflare, necesitarás:
     - Agregar el dominio a Cloudflare primero
     - Cambiar los nameservers en tu registrador de dominio

3. **Esperar a que se active**
   - Puede tardar unos minutos
   - Verás un certificado SSL automático

## Paso 5: Verificar que funciona

1. Visita tu dominio
2. Prueba las rutas de tu SPA (deben redirigir correctamente)
3. Verifica que el HTTPS esté funcionando

## Notas importantes

- Cloudflare Pages tiene un límite gratuito generoso
- El SSL/HTTPS es automático y gratuito
- Los deployments son automáticos cuando haces push a tu repositorio
- Puedes configurar preview deployments para pull requests
- El archivo `.npmrc` está configurado para resolver conflictos de dependencias
- Si tienes problemas de build, verifica que todas las versiones de Angular estén sincronizadas

## Comandos útiles

```bash
# Build local para probar
npm run build

# Verificar que el build funciona
cd dist/persona-project/browser
npx serve
```

