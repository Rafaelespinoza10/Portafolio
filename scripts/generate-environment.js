const fs = require('fs');
const path = require('path');

// Ruta del archivo environment.ts
const envPath = path.join(__dirname, '../src/environments/environment.ts');

// Obtener variables de entorno (requeridas)
// Si no están configuradas, el build fallará para evitar exponer credenciales
const requiredEnvVars = {
  EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
  EMAILJS_PRIVATE_KEY: process.env.EMAILJS_PRIVATE_KEY,
  FORMSPREE_ENDPOINT: process.env.FORMSPREE_ENDPOINT,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID
};
console.log('fireBase api key', requiredEnvVars.FIREBASE_API_KEY);
// Verificar que todas las variables estén configuradas
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('❌ ERROR: Faltan las siguientes variables de entorno:');
  missingVars.forEach(variable => console.error(`   - ${variable}`));
  console.error('\nPor favor, configura estas variables en Cloudflare Pages (Settings → Environment variables)');
  process.exit(1);
}

const environment = {
  emailJsSeviceId: requiredEnvVars.EMAILJS_SERVICE_ID,
  emailJsTemplateId: requiredEnvVars.EMAILJS_TEMPLATE_ID,
  publicApikey: requiredEnvVars.EMAILJS_PUBLIC_KEY,
  privateApiKey: requiredEnvVars.EMAILJS_PRIVATE_KEY,
  formspreeEndpoint: requiredEnvVars.FORMSPREE_ENDPOINT,
  firebase: {
    apiKey: requiredEnvVars.FIREBASE_API_KEY,
    authDomain: requiredEnvVars.FIREBASE_AUTH_DOMAIN,
    databaseURL: requiredEnvVars.FIREBASE_DATABASE_URL,
    projectId: requiredEnvVars.FIREBASE_PROJECT_ID,
    storageBucket: requiredEnvVars.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: requiredEnvVars.FIREBASE_MESSAGING_SENDER_ID,
    appId: requiredEnvVars.FIREBASE_APP_ID,
    measurementId: requiredEnvVars.FIREBASE_MEASUREMENT_ID
  }
};
console.log('environment', environment);
// Generar el contenido del archivo
const fileContent = `export const environment = {
  emailJsSeviceId: '${environment.emailJsSeviceId}',
  emailJsTemplateId: '${environment.emailJsTemplateId}',
  publicApikey: '${environment.publicApikey}',
  privateApiKey: '${environment.privateApiKey}',
  formspreeEndpoint: '${environment.formspreeEndpoint}',
  firebase: {
    apiKey: "${environment.firebase.apiKey}",
    authDomain: "${environment.firebase.authDomain}",
    databaseURL: "${environment.firebase.databaseURL}",
    projectId: "${environment.firebase.projectId}",
    storageBucket: "${environment.firebase.storageBucket}",
    messagingSenderId: "${environment.firebase.messagingSenderId}",
    appId: "${environment.firebase.appId}",
    measurementId: "${environment.firebase.measurementId}"
  }
};
`;

// Asegurar que el directorio existe
const envDir = path.dirname(envPath);
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Escribir el archivo
fs.writeFileSync(envPath, fileContent, 'utf8');
console.log('✅ environment.ts generado exitosamente');

