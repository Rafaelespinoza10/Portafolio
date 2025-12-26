import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class FontLoaderService {
  private fontPaths = {
    regular: 'assets/fonts/scripts/EBGaramond-Regular-normal.js',
    italic: 'assets/fonts/scripts/EBGaramond-Italic-italic.js',
    bold: 'assets/fonts/scripts/EBGaramond-Bold-bold.js'
  };

  constructor(private http: HttpClient) {}

  public async loadFonts(pdf: jsPDF): Promise<void> {
    try {
      
      const [regular, italic, bold] = await Promise.all([
        firstValueFrom(this.http.get(this.fontPaths.regular, { responseType: 'text' })),
        firstValueFrom(this.http.get(this.fontPaths.italic, { responseType: 'text' })),
        firstValueFrom(this.http.get(this.fontPaths.bold, { responseType: 'text' }))
      ]) as [string, string, string];

      // Extraer datos de fuente y registrarlas directamente en la instancia del PDF
      const extractAndRegisterFont = (script: string, swapNames: boolean = false) => {
        // Extraer el base64 de la fuente
        const base64Match = script.match(/var font = '([^']+)'/);
        if (!base64Match) {
          throw new Error('No se pudo extraer el base64 de la fuente');
        }
        const fontBase64 = base64Match[1];
        
        // Extraer el nombre del archivo TTF
        const ttfMatch = script.match(/addFileToVFS\(['"]([^'"]+)['"]/);
        if (!ttfMatch) {
          throw new Error('No se pudo extraer el nombre del archivo TTF');
        }
        const ttfFileName = ttfMatch[1];
        
        // Extraer el nombre de la fuente y el estilo
        const addFontMatch = script.match(/addFont\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/);
        if (!addFontMatch) {
          throw new Error('No se pudo extraer la información de addFont');
        }
        let fontFamily = addFontMatch[2];
        let fontStyle = addFontMatch[3];
        
        // ⚠️ SWAP: Los archivos TTF físicos están intercambiados
        // Regular contiene Bold físico, Bold contiene Regular físico
        if (swapNames) {
          if (fontFamily === 'EBGaramond-Regular') {
            fontFamily = 'EBGaramond-Bold';
            fontStyle = 'bold';
            console.log('✅ Swapped: EBGaramond-Regular → EBGaramond-Bold (bold)');
          } else if (fontFamily === 'EBGaramond-Bold') {
            fontFamily = 'EBGaramond-Regular';
            fontStyle = 'normal';
            console.log('✅ Swapped: EBGaramond-Bold → EBGaramond-Regular (normal)');
          }
        }
        
        // Registrar directamente en la instancia del PDF
        console.log(`📝 Registering font: ${fontFamily}, style: ${fontStyle}, file: ${ttfFileName}`);
        (pdf as any).addFileToVFS(ttfFileName, fontBase64);
        (pdf as any).addFont(ttfFileName, fontFamily, fontStyle);
        console.log(`✅ Font registered: ${fontFamily} (${fontStyle})`);
      };
      
      console.log('⚠️ Loading fonts with SWAPPED IDs (TTF files are physically swapped)');
      extractAndRegisterFont(regular, true);  // ⚠️ SWAP: archivo Regular contiene Bold físico
      extractAndRegisterFont(italic, false);  // ✅ OK: archivo Italic es correcto
      extractAndRegisterFont(bold, true);     // ⚠️ SWAP: archivo Bold contiene Regular físico
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // ✅ Verificar que las fuentes se registraron correctamente (SIN re-registrar)
      const availableFonts = (pdf as any).getFontList ? (pdf as any).getFontList() : {};
      console.log('📋 Available fonts (Font IDs):', availableFonts);
      
      const fontNames = Object.keys(availableFonts);
      console.log('🔍 All registered Font IDs:', fontNames);
      
      const hasGaramondRegular = fontNames.includes('EBGaramond-Regular');
      const hasGaramondBold = fontNames.includes('EBGaramond-Bold');
      const hasGaramondItalic = fontNames.includes('EBGaramond-Italic');
      
      console.log('✅ Font IDs verification:');
      console.log('  - EBGaramond-Regular:', hasGaramondRegular ? '✅' : '❌');
      console.log('  - EBGaramond-Bold:', hasGaramondBold ? '✅' : '❌');
      console.log('  - EBGaramond-Italic:', hasGaramondItalic ? '✅' : '❌');
      
      // 🔍 Probar establecer la fuente para verificar que funciona
      if (hasGaramondBold) {
        console.log('🧪 Testing EBGaramond-Bold with style bold...');
        pdf.setFont('EBGaramond-Bold', 'bold');
        const currentFont = (pdf as any).internal.getFont();
        console.log('  Current font after setFont:', currentFont);
      }
      if (hasGaramondRegular) {
        console.log('🧪 Testing EBGaramond-Regular with style normal...');
        pdf.setFont('EBGaramond-Regular', 'normal');
        const currentFont = (pdf as any).internal.getFont();
        console.log('  Current font after setFont:', currentFont);
      }
      
      if (!hasGaramondRegular || !hasGaramondBold || !hasGaramondItalic) {
        console.error('❌ Missing font IDs. Available:', fontNames);
        throw new Error('Failed to load all Garamond font variants');
      }
      
    } catch (error) {
      console.error('Error loading fonts:', error);
      throw error;
    }
  }

  public getAvailableFonts(): string[] {
    return (jsPDF as any).API.getFontList ? (jsPDF as any).API.getFontList() : [];
  }
}