import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { translations } from '../../../i18n/translations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styles: ``
})
export class BlogPageComponent implements OnInit, OnDestroy {
  private languageSubscription: Subscription = new Subscription();
  public title = '';
  public description = '';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
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
    this.title = translations['blog.title'][currentLang] as string;
    this.description = translations['blog.description'][currentLang] as string;
  }
}
