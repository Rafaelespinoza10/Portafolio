const fs = require('fs');
const path = require('path');

// Ruta del archivo environment.ts
const envPath = path.join(__dirname, '../src/environments/environment.ts');

// Obtener variables de entorno o usar valores por defecto
const environment = {
  emailJsSeviceId: process.env.EMAILJS_SERVICE_ID || 'service_6khjdrk',
  emailJsTemplateId: process.env.EMAILJS_TEMPLATE_ID || 'template_7yzpu3g',
  publicApikey: process.env.EMAILJS_PUBLIC_KEY || '4mSmR4MaseE3MY00o',
  privateApiKey: process.env.EMAILJS_PRIVATE_KEY || 'JeC8sF7HuEyg9SA240ktB',
  formspreeEndpoint: process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/mzzjlzkn',
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCKvKLNWU-0VTLfTSHSCkvucbc0TQCLcTk",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "portfolio-back-a6021.firebaseapp.com",
    databaseURL: process.env.FIREBASE_DATABASE_URL || "https://portfolio-back-a6021-default-rtdb.firebaseio.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "portfolio-back-a6021",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "portfolio-back-a6021.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "425540100611",
    appId: process.env.FIREBASE_APP_ID || "1:425540100611:web:c74e171a3a28c13ee66436",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-RTJT2X8H1S"
  }
};

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

