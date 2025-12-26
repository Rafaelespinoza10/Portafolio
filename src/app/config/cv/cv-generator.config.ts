/**
 * Configuración del generador de CV en PDF
 * Estilo Harvard con EB Garamond
 */
export const CV_GENERATOR_CONFIG = {
  paths: {
    basePath: 'assets/data/cv/',
    fileNameTemplate: 'cv-data.{language}.yml',
    outputNames: {
      es: 'CV_Rafael_Espinoza_Espanol.pdf',
      en: 'CV_Rafael_Espinoza_English.pdf'
    }
  },

  pdf: {
    orientation: 'portrait' as const,
    unit: 'mm' as const,
    format: 'a4' as const,
    margin: 20,
    pageBreakThreshold: 25,
    textWrapThreshold: 20,
    dateColumnWidth: 40  // Ancho de la columna de fecha (derecha)
  },

  // Colores estilo Harvard (negro sobre blanco)
  colors: {
    primary: { r: 0, g: 0, b: 0 },
    secondary: { r: 0, g: 0, b: 0 },
    accent: { r: 0, g: 0, b: 0 },
    
    textPrimary: { r: 0, g: 0, b: 0 },
    textSecondary: { r: 50, g: 50, b: 50 },
    textTertiary: { r: 70, g: 70, b: 70 },
    textBody: { r: 20, g: 20, b: 20 },
    dateText: { r: 110, g: 110, b: 110 },
    separatorLine: { r: 0, g: 0, b: 0 },
    sectionLine: { r: 0, g: 0, b: 0 }
  },

  typography: {
    fontFamily: 'EBGaramond',  // EB Garamond (con fallback a times)
    fonts: {
      normal: 'normal' as const,
      bold: 'bold' as const,
      italic: 'italic' as const
    },
    sizes: {
      name: 18,
      label: 10.7,
      sectionTitle: 10.7,
      itemTitle: 10.7,        // Aumentado de 10.5 a 11
      contactInfo: 9.5,
      bodyText: 10.7,       // Aumentado de 10 a 10.5
      metadata: 10.7,       // Aumentado de 10 a 10.5
      certification: 10.7
    }
  },

  spacing: {
    afterName: 1.5,
    betweenNameAndContact: 5, // Espaciado adicional entre nombre y líneas de contacto
    afterLabel: 2,
    afterContact: 15,        // Reducido de 15 a 10 para más compacto
    betweenContactLines: 4, // Espaciado entre primera y segunda línea de contacto
    afterSeparator: 10,
    afterSectionTitle: 3,    // Espaciado antes de la línea separadora
    afterSectionLine: 4,     // Espaciado después de la línea separadora
    afterItemTitle: 2.5,     // Reducido de 3.5 a 2.5
    afterSubtitle: 2,
    afterDate: 2.5,
    afterDescription: 3,     // Reducido de 4 a 3
    afterHighlight: 3.8,       // Reducido de 3.8 a 3
    afterItem: 4,            // Reducido de 6 a 4
    afterSection: 4,         // Reducido de 6 a 4
    afterCertification: 2,    // Reducido de 2.5 a 2
    lineHeight: 3.8,         // Reducido de 4.2 a 3.8
    bulletIndent: 5,
    textIndent: 0
  },

  lines: {
    separator: {
      color: { r: 0, g: 0, b: 0 },
      width: 0.2
    },
    section: {
      color: { r: 0, g: 0, b: 0 },
      width: 0.3,
      length: 999,
      offset: 0.5
    }
  },

  texts: {
    present: 'Present',
    presentEs: 'Presente',
    separator: {
      contact: ' | ',
      social: ' | ',
      dateLocation: ' - '
    },
    bullet: '•'
  }
};

export const getRGB = (color: { r: number; g: number; b: number }): [number, number, number] => {
  return [color.r, color.g, color.b];
};
