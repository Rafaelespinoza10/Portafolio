import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { translations } from '../../../i18n/translations';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
})
export class BlogCardComponent implements OnInit, OnDestroy {
  @Input() article: any;
  
  public readMore = translations['blog.readMore']['es'];
  private languageSubscription: Subscription = new Subscription();

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
    this.readMore = translations['blog.readMore'][currentLang] as string;
  }
}
