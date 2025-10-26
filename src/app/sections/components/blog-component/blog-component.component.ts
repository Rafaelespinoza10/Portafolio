import { BlogService } from './../../services/blog-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { translations } from '../../../i18n/translations';

@Component({
  selector: 'app-blog-component',
  templateUrl: './blog-component.component.html',
  styleUrl: './blog-component.component.css'
})
export class BlogComponentComponent implements OnInit, OnDestroy {
  public articles: any[] = [];
  public readMore = translations['blog.readMore']['es'];
  private languageSubscription: Subscription = new Subscription();
  
  constructor(
    private blogService: BlogService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadTranslations();
    this.loadArticles();
    
    this.languageSubscription.add(
      this.languageService.currentLanguage$.pipe(
        skip(1)
      ).subscribe(() => {
        this.loadTranslations();
        this.loadArticles();
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

  loadArticles() {
    const currentLang = this.languageService.getCurrentLanguage();
    const rawArticles = this.blogService.getArticles();
    
    this.articles = rawArticles.map((article: any, index: number) => {
      const articleNum = index + 1;
      return {
        ...article,
        title: translations[`blog.article${articleNum}.title`]?.[currentLang] || article.title,
        introduction: translations[`blog.article${articleNum}.introduction`]?.[currentLang] || article.introduction,
        description: translations[`blog.article${articleNum}.description`]?.[currentLang] || article.description,
        date: translations[`blog.article${articleNum}.date`]?.[currentLang] as string || article.date
      };
    });
  }
}
