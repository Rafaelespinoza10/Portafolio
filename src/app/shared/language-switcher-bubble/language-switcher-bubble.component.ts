import { Component, OnInit } from '@angular/core';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher-bubble',
  templateUrl: './language-switcher-bubble.component.html',
  styleUrl: './language-switcher-bubble.component.css'
})
export class LanguageSwitcherBubbleComponent implements OnInit {
  currentLanguage: Language = 'es';
  isHovered = false;

  constructor(public languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    
    // Suscribirse a cambios de idioma
    this.languageService.currentLanguage$.subscribe((lang: 'es' | 'en') => {
      this.currentLanguage = lang;
    });
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  getLanguageCode(): string {
    return this.currentLanguage.toUpperCase();
  }

}

