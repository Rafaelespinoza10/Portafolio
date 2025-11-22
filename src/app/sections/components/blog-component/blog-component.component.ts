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
  public filteredArticles: any[] = [];
  public allArticles: any[] = [];
  public categories: string[] = ['all', 'career', 'projects', 'learning', 'goals', 'experience', 'tools', 'tech'];
  public selectedCategory: string = 'all';
  public readMore = (translations['blog.readMore']['es'] as string) || 'Leer más';
  public myBlog = (translations['blog.myBlog']['es'] as string) || 'Mi Blog';
  public articlesByCategory = (translations['blog.articlesByCategory']['es'] as string) || 'Artículos por Categoría';
  public allCategories = (translations['blog.allCategories']['es'] as string) || 'Todas las Categorías';
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
    const readMoreValue = translations['blog.readMore'][currentLang];
    const myBlogValue = translations['blog.myBlog'][currentLang];
    const articlesByCategoryValue = translations['blog.articlesByCategory'][currentLang];
    const allCategoriesValue = translations['blog.allCategories'][currentLang];
    
    this.readMore = typeof readMoreValue === 'string' ? readMoreValue : (readMoreValue as string[]).join(' ');
    this.myBlog = typeof myBlogValue === 'string' ? myBlogValue : (myBlogValue as string[]).join(' ');
    this.articlesByCategory = typeof articlesByCategoryValue === 'string' ? articlesByCategoryValue : (articlesByCategoryValue as string[]).join(' ');
    this.allCategories = typeof allCategoriesValue === 'string' ? allCategoriesValue : (allCategoriesValue as string[]).join(' ');
  }

  loadArticles() {
    const currentLang = this.languageService.getCurrentLanguage();
    const rawArticles = this.blogService.getArticles();
    
    // Mapear artículos con traducciones y calcular índice original
    const articlesWithIndex = rawArticles.map((article: any, index: number) => {
      const articleNum = index + 1;
      return {
        ...article,
        originalIndex: index,
        title: translations[`blog.article${articleNum}.title`]?.[currentLang] || article.title,
        introduction: translations[`blog.article${articleNum}.introduction`]?.[currentLang] || article.introduction,
        description: translations[`blog.article${articleNum}.description`]?.[currentLang] || article.description,
        date: translations[`blog.article${articleNum}.date`]?.[currentLang] as string || article.date,
        dateSort: this.parseDate(translations[`blog.article${articleNum}.date`]?.[currentLang] as string || article.date)
      };
    });
    
    // Ordenar por fecha descendente (más reciente primero)
    articlesWithIndex.sort((a: any, b: any) => {
      if (b.dateSort > a.dateSort) return 1;
      if (b.dateSort < a.dateSort) return -1;
      return 0;
    });
    
    this.allArticles = articlesWithIndex;
    this.articles = articlesWithIndex;
    this.filteredArticles = articlesWithIndex.slice(3); // Artículos después del featured y los 2 secundarios
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'all') {
      this.filteredArticles = this.allArticles.slice(3);
    } else {
      this.filteredArticles = this.allArticles
        .filter(article => article.category === category)
        .slice(0); // Mostrar todos los de esa categoría
    }
  }

  getCategoryLabel(category: string): string {
    const currentLang = this.languageService.getCurrentLanguage();
    if (category === 'all') {
      return this.allCategories;
    }
    const label = translations[`blog.category.${category}`]?.[currentLang];
    if (typeof label === 'string') {
      return label;
    }
    if (Array.isArray(label)) {
      return label.join(' ');
    }
    return category;
  }

  getCategoryEmoji(category: string): string {
    const emojis: { [key: string]: string } = {
      'all': '📚',
      'career': '💼',
      'projects': '🚀',
      'learning': '📖',
      'goals': '🎯',
      'experience': '💡',
      'tools': '🛠️',
      'tech': '💻'
    };
    return emojis[category] || '📝';
  }

  getReadingTime(text: string): number {
    // Calcular tiempo de lectura aproximado (palabras promedio por minuto: 200)
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    return readingTime < 1 ? 1 : readingTime;
  }

  private parseDate(dateString: string): number {
    // Convierte fechas como "Diciembre, 2024" o "Noviembre, 2024" a un número ordenable
    const months: { [key: string]: number } = {
      'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4,
      'mayo': 5, 'junio': 6, 'julio': 7, 'agosto': 8,
      'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12,
      'january': 1, 'february': 2, 'march': 3, 'april': 4,
      'may': 5, 'june': 6, 'july': 7, 'august': 8,
      'september': 9, 'october': 10, 'november': 11, 'december': 12
    };
    
    const parts = dateString.toLowerCase().split(',');
    if (parts.length === 2) {
      const monthName = parts[0].trim();
      const year = parseInt(parts[1].trim(), 10);
      const month = months[monthName] || 0;
      // Retorna año * 100 + mes para ordenamiento (mayor = más reciente)
      return year * 100 + month;
    }
    return 0;
  }
}
