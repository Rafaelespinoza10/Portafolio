import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject<Language>('es');
  public currentLanguage$ = this.currentLanguage.asObservable();

  constructor() {
    // 1. Verificar si hay preferencia guardada
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      this.setLanguage(savedLanguage);
      return;
    }

    // 2. Detectar idioma del navegador
    const browserLanguage = this.detectBrowserLanguage();
    this.setLanguage(browserLanguage);
  }

  private detectBrowserLanguage(): Language {
    // Obtener idioma del navegador
    const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
    
    // Lista de idiomas que soportamos en español
    const spanishLanguages = ['es', 'es-ES', 'es-MX', 'es-AR', 'es-CO', 'es-CL', 'es-PE', 'es-VE'];
    
    // Verificar si el idioma del navegador es español
    if (spanishLanguages.some(lang => browserLang.startsWith(lang))) {
      return 'es';
    }
    
    // Por defecto inglés para otros idiomas
    return 'en';
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage.value;
  }

  setLanguage(language: Language): void {
    this.currentLanguage.next(language);
    localStorage.setItem('language', language);
    
    document.documentElement.lang = language;
  }

  toggleLanguage(): void {
    const newLanguage = this.currentLanguage.value === 'es' ? 'en' : 'es';
    this.setLanguage(newLanguage);
  }
}
