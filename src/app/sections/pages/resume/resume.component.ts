import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styles: ``
})
export class ResumePageComponent implements OnInit, OnDestroy {

  private languageSubscription: Subscription = new Subscription();
  public title = translations['resume.title']['es'];
  public subtitle = translations['resume.subtitle']['es'];
  public experienceTitle = translations['resume.experience.title']['es'];
  public educationTitle = translations['resume.education.title']['es'];
  public skillsTitle = translations['resume.skills.title']['es'];

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    // Cargar traducciones iniciales
    this.loadTranslations();
    
    // Suscribirse a cambios de idioma
    this.languageSubscription.add(
      this.languageService.currentLanguage$.pipe(
        skip(1)
      ).subscribe(() => {
        this.loadTranslations();
      })
    );
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  private loadTranslations(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.title = translations['resume.title'][currentLang];
    this.subtitle = translations['resume.subtitle'][currentLang];
    this.experienceTitle = translations['resume.experience.title'][currentLang];
    this.educationTitle = translations['resume.education.title'][currentLang];
    this.skillsTitle = translations['resume.skills.title'][currentLang];
  }

}
