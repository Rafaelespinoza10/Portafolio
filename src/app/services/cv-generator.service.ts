import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as yml from 'js-yaml';
import jsPDF from 'jspdf';
import { CV_GENERATOR_CONFIG, getRGB } from '../config/cv/cv-generator.config';
import { CVData } from '../interfaces/cv.interface';
import { FontLoaderService } from './font-loader.service';

@Injectable({
    providedIn: 'root'
})
export class CVGeneratorService {
    private readonly basePath = CV_GENERATOR_CONFIG.paths.basePath;
    private currentFontFamily = CV_GENERATOR_CONFIG.typography.fontFamily; // EBGaramond
    private currentLanguage: 'es' | 'en' = 'en';

    // Meses en español e inglés
    private readonly monthsEs = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    private readonly monthsEn = ['January', 'February', 'March', 'April', 'May', 'June',
                                  'July', 'August', 'September', 'October', 'November', 'December'];

    constructor(
        private http: HttpClient,
        private fontLoaderService: FontLoaderService
    ) {}

    private formatDate(dateStr: string, language: 'es' | 'en'): string {
        if (!dateStr) return '';
        
        if (dateStr === 'present') return language === 'es' ? 'Presente' : 'Present';
        if (dateStr === 'presente') return language === 'es' ? 'Presente' : 'Present';
        
        // Parsear formato YYYY-MM
        const parts = dateStr.split('-');
        if (parts.length >= 2) {
            const year = parts[0];
            const monthIndex = parseInt(parts[1], 10) - 1;
            
            if (monthIndex >= 0 && monthIndex < 12) {
                const months = language === 'es' ? this.monthsEs : this.monthsEn;
                return `${months[monthIndex]} ${year}`;
            }
        }
        
        return dateStr;
    }

    private loadCustomFonts(pdf: jsPDF): Observable<void> {
        return new Observable((observer: any) => {
            console.log('Starting to load custom fonts...');
            this.fontLoaderService.loadFonts(pdf)
                .then(() => {
                    console.log('Fonts loaded successfully, setting currentFontFamily to:', CV_GENERATOR_CONFIG.typography.fontFamily);
                    this.currentFontFamily = CV_GENERATOR_CONFIG.typography.fontFamily;
                    observer.next();
                    observer.complete();
                })
                .catch((error) => {
                    console.error('Error loading fonts, falling back to times:', error);
                    console.error('Error details:', error);
                    this.currentFontFamily = 'times';
                    observer.next();
                    observer.complete();
                });
        });
    }

    // Generate and download PDF CV
    public generateAndDownloadCV(language: 'es' | 'en'): Observable<void> {
        const fileName = CV_GENERATOR_CONFIG.paths.fileNameTemplate.replace('{language}', language);
        
        return this.http.get(`${this.basePath}${fileName}`, {responseType: 'text'}).pipe(
            switchMap((yamlText: any) => {
                const cvData = yml.load(yamlText) as CVData;
                const pdf = new jsPDF({
                    orientation: CV_GENERATOR_CONFIG.pdf.orientation,
                    unit: CV_GENERATOR_CONFIG.pdf.unit,
                    format: CV_GENERATOR_CONFIG.pdf.format
                });
                
                // Cargar fuentes primero
                return this.loadCustomFonts(pdf).pipe(
                    map(() => {
                        this.generatePDFWithFonts(pdf, cvData, language);
                        const pdfFileName = CV_GENERATOR_CONFIG.paths.outputNames[language];
                        pdf.save(pdfFileName);
                    })
                );
            })
        );
    }

    public generateAndDownloadAllCVs(): Observable<void> {
        return forkJoin({
            es: this.http.get(`${this.basePath}cv-data.es.yml`, {responseType: 'text'}),
            en: this.http.get(`${this.basePath}cv-data.en.yml`, {responseType: 'text'})
        }).pipe(
            switchMap(({ es, en }: { es: any, en: any }) => {
                const cvDataES = yml.load(es) as CVData;
                const cvDataEN = yml.load(en) as CVData;
                
                const pdfES = new jsPDF({
                    orientation: CV_GENERATOR_CONFIG.pdf.orientation,
                    unit: CV_GENERATOR_CONFIG.pdf.unit,
                    format: CV_GENERATOR_CONFIG.pdf.format
                });
                
                const pdfEN = new jsPDF({
                    orientation: CV_GENERATOR_CONFIG.pdf.orientation,
                    unit: CV_GENERATOR_CONFIG.pdf.unit,
                    format: CV_GENERATOR_CONFIG.pdf.format
                });
                
                return forkJoin({
                    fontES: this.loadCustomFonts(pdfES),
                    fontEN: this.loadCustomFonts(pdfEN)
                }).pipe(
                    map(() => {
                        this.generatePDFWithFonts(pdfES, cvDataES, 'es');
                        pdfES.save(CV_GENERATOR_CONFIG.paths.outputNames.es);
                        
                        this.generatePDFWithFonts(pdfEN, cvDataEN, 'en');
                        pdfEN.save(CV_GENERATOR_CONFIG.paths.outputNames.en);
                    })
                );
            })
        );
    }

    
    private sectionHasContent(sectionData: any): boolean {
        if (!sectionData) return false;
        
        if (typeof sectionData === 'string') {
            return sectionData.trim().length > 0;
        }
        
        if (Array.isArray(sectionData)) {
            return sectionData.length > 0;
        }
        
        if (typeof sectionData === 'object') {
            // Verificar si el objeto tiene al menos una propiedad con valor
            return Object.values(sectionData).some(value => {
                if (typeof value === 'string') return value.trim().length > 0;
                if (Array.isArray(value)) return value.length > 0;
                return value !== null && value !== undefined;
            });
        }
        
        return false;
    }

    private generatePDFWithFonts(pdf: jsPDF, cvData: CVData, language: 'es' | 'en'): void {
        const config = CV_GENERATOR_CONFIG;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = config.pdf.margin;
        const contentWidth = pageWidth - (margin * 2);
        let yPosition = margin;
        const cv = cvData.cv;
        
        // Guardar idioma actual para formateo de fechas
        this.currentLanguage = language;

        // Header (Nombre)
        this.generateHeader(pdf, cv, yPosition, margin);
        yPosition += config.spacing.afterName;
        
        // Contact Info (2 líneas con iconos)
        yPosition += config.spacing.betweenNameAndContact;
        this.generateContactInfo(pdf, cv, yPosition, margin);
        yPosition += config.spacing.afterContact;

        // Sections - Cada sección tiene su propia línea debajo del título
        if (cv.sections){
            const sectionEntries = Object.entries(cv.sections);
            
            sectionEntries.forEach(([sectionName, sectionData], index) => {
                // Verificar si la sección tiene contenido
                const hasContent = this.sectionHasContent(sectionData);
                
                if (hasContent) {
                    // Verificar si necesitamos nueva página antes de agregar la sección
                    if (yPosition > pageHeight - 40) {
                        pdf.addPage();
                        yPosition = margin;
                    }
                    
                    yPosition = this.addSection(pdf, sectionName, sectionData, margin, yPosition, contentWidth, pageHeight);
                }
            });
        }
    }

    private generateHeader(pdf: jsPDF, cv: CVData['cv'], yPosition: number, margin: number): void{
        const config = CV_GENERATOR_CONFIG;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const centerX = pageWidth / 2;
        
        pdf.setFont('EBGaramond-Normal', 'normal');
        pdf.setFontSize(config.typography.sizes.name);
        pdf.setTextColor(...getRGB(config.colors.primary));
        pdf.text(cv.name.toUpperCase(), centerX, yPosition, { align: 'center' });
    }

    private generateContactInfo(pdf: jsPDF, cv: CVData['cv'], yPosition: number, margin: number): void{
        const config = CV_GENERATOR_CONFIG;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const centerX = pageWidth / 2;
        
        pdf.setFontSize(config.typography.sizes.contactInfo);
        pdf.setTextColor(...getRGB(config.colors.textSecondary));
        pdf.setFont('EBGaramond-Regular', 'normal');
        
        // Primera línea: Location, Email, Phone
        const contactLine1: string[] = [];
        if (cv.location) contactLine1.push(cv.location);
        if (cv.email) contactLine1.push(cv.email);
        if (cv.phone) contactLine1.push(cv.phone);

        if (contactLine1.length > 0) {
            const contactText = contactLine1.join(config.texts.separator.contact);
            pdf.text(contactText, centerX, yPosition, { align: 'center' });
            yPosition += config.spacing.betweenContactLines;
        }
        
        // Segunda línea: Social Networks con iconos
        if (cv.social_networks && cv.social_networks.length > 0) {
            const socialParts: { icon: string, text: string }[] = [];
            
            cv.social_networks.forEach((sn: any) => {
                if (sn.network === 'LinkedIn') {
                    socialParts.push({
                        icon: '🔗',  // Icono de LinkedIn
                        text: `LinkedIn: linkedin.com/in/${sn.username || ''}`
                    });
                } else if (sn.network === 'GitHub') {
                    socialParts.push({
                        icon: '💻',  // Icono de GitHub
                        text: `GitHub: github.com/${sn.username || ''}`
                    });
                }
            });
            
            if (socialParts.length > 0) {
                // Construir el texto con iconos
                const socialTexts = socialParts.map(part => `${part.icon} ${part.text}`);
                const socialText = socialTexts.join(config.texts.separator.social);
                pdf.text(socialText, centerX, yPosition, { align: 'center' });
            }
        }
    }
    

    private addSection(
        pdf: jsPDF,
        sectionName: string,
        sectionData: any,
        margin: number,
        yPosition: number,
        contentWidth: number,
        pageHeight: number
    ): number {
        const config = CV_GENERATOR_CONFIG;
        let currentY = yPosition;
    
        // Verificar si la sección tiene contenido
        const hasContent = this.sectionHasContent(sectionData);
        if (!hasContent) {
            return currentY;
        }
        
        // Check if we need a new page before section
        if (currentY > pageHeight - 40) {
            pdf.addPage();
            currentY = margin;
        }
        
        // Section Title (UPPERCASE, bold)
        this.setSectionTitleFont(pdf);
        pdf.setFontSize(config.typography.sizes.sectionTitle);
        pdf.setTextColor(...getRGB(config.colors.secondary));
        pdf.text(sectionName.toUpperCase(), margin, currentY);
        currentY += config.spacing.afterSectionTitle;
    
        // Section Line (full width, delgada)
        const pageWidth = pdf.internal.pageSize.getWidth();
        pdf.setDrawColor(...getRGB(config.colors.sectionLine));
        pdf.setLineWidth(config.lines.section.width);
        pdf.line(margin, currentY - config.lines.section.offset, pageWidth - margin, currentY - config.lines.section.offset);
        currentY += config.spacing.afterSectionLine;
    
        // Section Content
        this.setBodyFont(pdf);
        pdf.setFontSize(config.typography.sizes.bodyText);
        pdf.setTextColor(...getRGB(config.colors.textBody));
    
        if (sectionName.toLowerCase().includes('certificacion') || sectionName.toLowerCase().includes('certification')) {
            if (Array.isArray(sectionData)) {
                sectionData.forEach((item: any, index: number) => {
                    // Check page break antes de cada certificación
                    if (currentY > pageHeight - config.pdf.textWrapThreshold) {
                        pdf.addPage();
                        currentY = margin;
                    }
                    currentY = this.addCertificationItem(pdf, item, margin, currentY, contentWidth, pageHeight);
                });
            }
        }
        // Manejo especial para Skills (más compacto, label: details en la misma línea)
        else if (sectionName.toLowerCase().includes('habilidades') || sectionName.toLowerCase().includes('skills')) {
            sectionData.forEach((item: any) => {
                currentY = this.addSkillItem(pdf, item, margin, currentY, contentWidth, pageHeight);
            });
            return currentY;
        }
        
        // Resto de secciones (Experience, Education, etc.)
        else if (Array.isArray(sectionData)) {
            sectionData.forEach((item: any) => {
                // Check page break antes de cada item importante
                if (currentY > pageHeight - 50) {
                    pdf.addPage();
                    currentY = margin;
                }
                currentY = this.addSectionItem(pdf, item, margin, currentY, contentWidth, pageHeight);
            });
        } else if (typeof sectionData === 'object') {
            currentY = this.addSectionItem(pdf, sectionData, margin, currentY, contentWidth, pageHeight);
        } else if (typeof sectionData === 'string') {
            const lines = pdf.splitTextToSize(sectionData, contentWidth);
            lines.forEach((line: string) => {
                if (currentY > pageHeight - config.pdf.textWrapThreshold) {
                    pdf.addPage();
                    currentY = margin;
                }
                pdf.text(line, margin, currentY);
                currentY += config.spacing.lineHeight;
            });
        }
    
        currentY += config.spacing.afterSection;
        return currentY;
    }
    
    private addSectionItem(
        pdf: jsPDF,
        item: any,
        margin: number,
        yPosition: number,
        contentWidth: number,
        pageHeight: number
    ): number {
        if (item.label && item.details) {
            return yPosition;
        }
        const config = CV_GENERATOR_CONFIG;
        const pageWidth = pdf.internal.pageSize.getWidth();
        let currentY = yPosition;
        
        // Calcular ancho de columnas
        const dateColumnWidth = config.pdf.dateColumnWidth;
        const contentColumnWidth = contentWidth - dateColumnWidth - 5; // 5mm de gap
    
        // FECHA Y UBICACIÓN A LA DERECHA (primero para saber la altura)
        let dateHeight = 0;
        if (item.start_date || item.end_date || item.date || item.location) {
            const rightColumnX = pageWidth - margin - dateColumnWidth;
            
            pdf.setFont('EBGaramond-Bold', 'bold');
            pdf.setFontSize(config.typography.sizes.metadata);
            pdf.setTextColor(...getRGB(config.colors.dateText));
            
            // Primera línea: Fecha formateada (ej: "May 2024 - Present")
            if (item.start_date && item.end_date) {
                const startFormatted = this.formatDate(item.start_date, this.currentLanguage);
                const endFormatted = this.formatDate(item.end_date, this.currentLanguage);
                const dateText = `${startFormatted} - ${endFormatted}`;
                pdf.text(dateText, rightColumnX, currentY, { align: 'left' });
                dateHeight += config.spacing.lineHeight;
            } else if (item.date) {
                const dateFormatted = this.formatDate(item.date, this.currentLanguage);
                pdf.text(dateFormatted, rightColumnX, currentY, { align: 'left' });
                dateHeight += config.spacing.lineHeight;
            }
            
            // Segunda línea: Location (si existe)
            if (item.location) {
                pdf.text(item.location, rightColumnX, currentY + dateHeight, { align: 'left' });
                dateHeight += config.spacing.lineHeight;
            }
        }
    
        // TÍTULO/POSITION A LA IZQUIERDA (columna principal)
        if (item.title || item.position || item.name || item.company || item.institution || item.label) {
            this.setBodyFont(pdf);
            pdf.setFontSize(config.typography.sizes.itemTitle);
            pdf.setTextColor(...getRGB(config.colors.primary));
            
            let titleText = '';
            
            // Formato para experiencia: Position, Company
            if (item.position && item.company) {
                titleText = `${item.position}, ${item.company}`;
            }
            // Formato para educación: Degree in Area, Institution
            else if (item.degree && item.area && item.institution) {
                titleText = `${item.degree} in ${item.area}, ${item.institution}`;
            }
            else if (item.degree && item.institution) {
                titleText = `${item.degree}, ${item.institution}`;
            }
            // Formato genérico
            else {
                titleText = item.title || item.position || item.name || item.label || '';
                if (item.company) titleText += `, ${item.company}`;
                else if (item.institution) titleText += `, ${item.institution}`;
            }
            
            // Wrap text si es muy largo
            const titleLines = pdf.splitTextToSize(titleText, contentColumnWidth);
            titleLines.forEach((line: string, index: number) => {
                pdf.text(line, margin, currentY + (index * config.spacing.lineHeight));
            });
            
            const titleHeight = titleLines.length * config.spacing.lineHeight;
            currentY += Math.max(titleHeight, dateHeight);
            currentY += config.spacing.afterItemTitle;
        } else {
            // Si no hay título, avanzar por la altura de la fecha
            currentY += dateHeight;
            currentY += config.spacing.afterDate;
        }
    
        console.log('item', item);
        console.log('item description', item.description);
        console.log('item summary', item.summary);
        // Description/Summary
        if (item.description || item.summary) {
            //pdf.setFont('EBGaramond-Regular', 'normal');
            console.log('item description', item.description);
            this.setBodyFont(pdf);
            pdf.setFontSize(config.typography.sizes.bodyText);
            pdf.setTextColor(...getRGB(config.colors.textBody));
            const description = item.description || item.summary;
            const lines = pdf.splitTextToSize(description, contentWidth);
            lines.forEach((line: string) => {
                if (currentY > pageHeight - config.pdf.textWrapThreshold) {
                    pdf.addPage();
                    currentY = margin;
                }
                pdf.text(line, margin + config.spacing.textIndent, currentY);
                currentY += config.spacing.afterDescription;
            });
        }
    
        // Highlights/Bullet points
        if (item.highlights && Array.isArray(item.highlights)) {            
            const bulletIndent = config.spacing.bulletIndent;
            const bulletTextWidth = contentWidth - bulletIndent; // Todo el ancho menos el indent
            
            item.highlights.forEach((highlight: string) => {
                if (currentY > pageHeight - config.pdf.textWrapThreshold) {
                    pdf.addPage();
                    currentY = margin;
                }
                
                // Bullet point
                pdf.setFont('EBGaramond-Bold', 'bold');
                pdf.setFontSize(config.typography.sizes.bodyText);
                pdf.setTextColor(...getRGB(config.colors.textBody));
                pdf.text(config.texts.bullet, margin, currentY);
                
                // Wrap text usando TODO el ancho disponible
                const lines = pdf.splitTextToSize(highlight, bulletTextWidth);
                lines.forEach((line: string, index: number) => {
                    if (index === 0) {
                        pdf.text(line, margin + bulletIndent, currentY);
                    } else {
                        currentY += config.spacing.afterHighlight;
                        pdf.text(line, margin + bulletIndent, currentY);
                    }
                });
                currentY += config.spacing.afterHighlight;
            });
        }
    
      
        if (item.label && item.details) {
            this.setBodyFont(pdf);
            pdf.setFontSize(config.typography.sizes.bodyText);
            pdf.setTextColor(...getRGB(config.colors.textBody));
            pdf.text(item.label + ':', margin, currentY);
            
            // Details después del label - usando TODO el ancho disponible
            pdf.setFont('EBGaramond-Regular', 'normal');
            pdf.setTextColor(...getRGB(config.colors.textBody));
            const labelWidth = pdf.getTextWidth(item.label + ': ');
            const detailsWidth = contentWidth - labelWidth; // Todo el ancho
            const lines = pdf.splitTextToSize(item.details, detailsWidth);
            
            lines.forEach((line: string, index: number) => {
                if (index === 0) {
                    pdf.text(line, margin + labelWidth, currentY);
                } else {
                    currentY += config.spacing.lineHeight;
                    pdf.text(line, margin, currentY);
                }
            });
            currentY += config.spacing.afterItem;
        }
        
        // Skills array (legacy) - usando TODO el ancho
        else if (item.skills && Array.isArray(item.skills)) {
            this.setBodyFont(pdf);
            pdf.setFontSize(config.typography.sizes.bodyText);
            pdf.setTextColor(...getRGB(config.colors.textBody));
            const skillsText = item.skills.join(', ');
            const lines = pdf.splitTextToSize(skillsText, contentWidth); // Todo el ancho
            lines.forEach((line: string) => {
                if (currentY > pageHeight - config.pdf.textWrapThreshold) {
                    pdf.addPage();
                    currentY = margin;
                }
                pdf.text(line, margin + config.spacing.textIndent, currentY);
                currentY += config.spacing.lineHeight;
            });
        }
    
        currentY += config.spacing.afterItem;
        pdf.setTextColor(...getRGB(config.colors.textPrimary)); // Reset color
        return currentY;
    }
    
    private addCertificationItem(
        pdf: jsPDF,
        item: any,
        margin: number,
        yPosition: number,
        contentWidth: number,
        pageHeight: number
    ): number {
        const config = CV_GENERATOR_CONFIG;
        const pageWidth = pdf.internal.pageSize.getWidth();
        let currentY = yPosition;
        
        // Calcular ancho de columnas
        const dateColumnWidth = config.pdf.dateColumnWidth;
        const contentColumnWidth = contentWidth - dateColumnWidth - 5;
        
        // FECHA A LA DERECHA (formateada: "May 2024")
        if (item.date) {
            const rightColumnX = pageWidth - margin - dateColumnWidth;
            pdf.setFont('EBGaramond-Bold', 'bold');
            pdf.setFontSize(config.typography.sizes.certification);
            pdf.setTextColor(...getRGB(config.colors.dateText));
            const dateFormatted = this.formatDate(item.date, this.currentLanguage);
            pdf.text(dateFormatted, rightColumnX, currentY, { align: 'left' });
        }
        
        // TÍTULO + INSTITUCIÓN A LA IZQUIERDA
        pdf.setFont('EBGaramond-Bold', 'bold');
        pdf.setFontSize(config.typography.sizes.certification);
        pdf.setTextColor(...getRGB(config.colors.textPrimary));
        
        const title = item.title || '';
        const institution = item.institution ? `, ${item.institution}` : '';
        const fullText = `${title}${institution}`;
        
        // Wrap text si es muy largo
        const lines = pdf.splitTextToSize(fullText, contentColumnWidth);
        lines.forEach((line: string, index: number) => {
            pdf.text(line, margin, currentY + (index * config.spacing.afterCertification));
        });
        
        currentY += lines.length * config.spacing.afterCertification + config.spacing.afterCertification;
        
        return currentY;
    }
    
    private addSkillItem(
        pdf: jsPDF,
        item: any,
        margin: number,
        yPosition: number,
        contentWidth: number,
        pageHeight: number
      ): number {
       
        const config = CV_GENERATOR_CONFIG;
        let currentY = yPosition;
      
        if (!item.label || !item.details) return currentY;
        this.setBodyFont(pdf);
        pdf.setFontSize(config.typography.sizes.bodyText);
        pdf.setTextColor(...getRGB(config.colors.textBody));
        
      
        const labelText = item.label + ': ';
        pdf.text(labelText, margin, currentY);
      
        const labelWidth = pdf.getTextWidth(labelText);
        const remainingWidth = contentWidth - labelWidth;
      
        pdf.setFont('EBGaramond-Bold', 'bold');
        pdf.setTextColor(...getRGB(config.colors.textBody));
      
        const firstLineParts = pdf.splitTextToSize(item.details, remainingWidth);
      
        pdf.text(firstLineParts[0], margin + labelWidth, currentY);
      
        for (let i = 1; i < firstLineParts.length; i++) {
          currentY += config.spacing.lineHeight;
      
          if (currentY > pageHeight - config.pdf.textWrapThreshold) {
            pdf.addPage();
            currentY = margin;
          }
      
          pdf.text(firstLineParts[i], margin, currentY);
        }
      
        currentY += config.spacing.afterItem;
        return currentY;
      }
    
      private setSectionTitleFont(pdf: jsPDF) {
        pdf.setFont('EBGaramond-Regular', 'normal');
      }
      
      private setBodyFont(pdf: jsPDF) {
        pdf.setFont('EBGaramond-Regular', 'normal');
      }
      
}