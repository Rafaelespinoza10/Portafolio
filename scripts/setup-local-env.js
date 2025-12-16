const fs = require('fs');
const path = require('path');

// Script para desarrollo local - copia .env.example a .env si no existe
const envExamplePath = path.join(__dirname, '../.env.example');
const envPath = path.join(__dirname, '../.env');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('📝 Creando archivo .env desde .env.example...');
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ Archivo .env creado. Por favor, completa los valores con tus credenciales reales.');
  console.log('⚠️  NO subas el archivo .env al repositorio (está en .gitignore)');
} else if (fs.existsSync(envPath)) {
  console.log('✅ Archivo .env ya existe');
} else {
  console.log('⚠️  No se encontró .env.example');
}

