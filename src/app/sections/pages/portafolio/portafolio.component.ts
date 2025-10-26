import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styles: ``
})
export class PortafolioPageComponent implements OnInit, OnDestroy {
  private languageSubscription: Subscription = new Subscription();
  public title = translations['portfolio.title']['es'];
  public subtitle = translations['portfolio.subtitle']['es'];

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.loadTranslations();
    
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
    this.title = translations['portfolio.title'][currentLang];
    this.subtitle = translations['portfolio.subtitle'][currentLang];
  }
}
