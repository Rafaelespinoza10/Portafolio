import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../i18n/translations';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(private languageService: LanguageService) {}

  transform(key: string): string {
    if (!key) {
      return '';
    }

    const currentLang = this.languageService.getCurrentLanguage();
    const translation = translations[key];
    
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    const value = translation[currentLang];
    
    // Si el valor es un array, lo convierte a string
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    
    return value as string || key;
  }
}
