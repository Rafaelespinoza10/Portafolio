import { Component } from '@angular/core';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  
  constructor(public languageService: LanguageService) {}

  get currentLanguage(): Language {
    return this.languageService.getCurrentLanguage();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  getLanguageFlag(lang: Language): string {
    return lang === 'es' ? '🇪🇸' : '🇺🇸';
  }

  getLanguageName(lang: Language): string {
    return lang === 'es' ? 'Español' : 'English';
  }
}
