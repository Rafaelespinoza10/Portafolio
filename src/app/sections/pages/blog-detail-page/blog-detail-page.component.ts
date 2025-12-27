import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog-service.service';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { translations } from '../../../i18n/translations';
import { SEOService } from '../../../services/seo.service';

@Component({
  selector: 'app-blog-detail-page',
  templateUrl: './blog-detail-page.component.html',
  styleUrl: './blog-detail-page.component.css'
})
export class BlogDetailPageComponent implements OnInit, OnDestroy {
  public articleId?: string;
  article: any;
  private languageSubscription: Subscription = new Subscription();
  private allArticles: any[] = [];
  
  // Translated labels
  public backToBlog = translations['blogDetail.backToBlog']['es'];
  public videoTitle = translations['blogDetail.videoTitle']['es'];
  public watchVideo = translations['blogDetail.watchVideo']['es'];
  public videoDescription = translations['blogDetail.videoDescription']['es'];
  public youtubeShort = translations['blogDetail.youtubeShort']['es'];
  public projectDemo = translations['blogDetail.projectDemo']['es'];
  public shareTwitter = translations['blogDetail.shareTwitter']['es'];
  public copyLinkLabel = translations['blogDetail.copyLink']['es'];
  public pdfTitle = translations['blogDetail.pdfTitle']['es'];
  public viewPdf = translations['blogDetail.viewPdf']['es'];
  public downloadPdf = translations['blogDetail.downloadPdf']['es'];
  public pdfDescription = translations['blogDetail.pdfDescription']['es'];
  public certificatesTitle = translations['blogDetail.certificatesTitle']['es'];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private languageService: LanguageService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    // Load translations
    this.loadTranslations();
    
    // Load all articles from the service
    this.allArticles = this.blogService.getArticles();
    
    // Subscribe to route params to load specific article
    this.route.paramMap.subscribe(
      (params: any) => {
        const id = params.get('id');
        if (id) {
          this.articleId = id;
          this.loadArticle(id);
        }
      }
    );

    // Subscribe to language changes
    this.languageSubscription.add(
      this.languageService.currentLanguage$.pipe(
        skip(1)
      ).subscribe(() => {
        this.loadTranslations();
        if (this.articleId) {
          this.loadArticle(this.articleId);
        }
      })
    );
  }
  
  private loadTranslations(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.backToBlog = translations['blogDetail.backToBlog'][currentLang] as string;
    this.videoTitle = translations['blogDetail.videoTitle'][currentLang] as string;
    this.watchVideo = translations['blogDetail.watchVideo'][currentLang] as string;
    this.videoDescription = translations['blogDetail.videoDescription'][currentLang] as string;
    this.youtubeShort = translations['blogDetail.youtubeShort'][currentLang] as string;
    this.projectDemo = translations['blogDetail.projectDemo'][currentLang] as string;
    this.shareTwitter = translations['blogDetail.shareTwitter'][currentLang] as string;
    this.copyLinkLabel = translations['blogDetail.copyLink'][currentLang] as string;
    this.pdfTitle = translations['blogDetail.pdfTitle'][currentLang] as string;
    this.viewPdf = translations['blogDetail.viewPdf'][currentLang] as string;
    this.downloadPdf = translations['blogDetail.downloadPdf'][currentLang] as string;
    this.pdfDescription = translations['blogDetail.pdfDescription'][currentLang] as string;
    this.certificatesTitle = translations['blogDetail.certificatesTitle'][currentLang] as string;
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  loadArticle(id: string): void {
    const currentLang = this.languageService.getCurrentLanguage();
    
    // Get the base article from the service
    const baseArticle = this.blogService.getArticlesById(id);
    
    if (!baseArticle) {
      this.article = null;
      return;
    }

    const articleIndex = this.getArticleIndex(id);
    const translatedDate = translations[`blog.article${articleIndex}.date`]?.[currentLang] as string;

    // Create a new article object with translated content
    this.article = {
      ...baseArticle,
      title: this.getTranslation(`blog.article${articleIndex}.title`),
      introduction: this.getTranslation(`blog.article${articleIndex}.introduction`),
      description: this.getTranslation(`blog.article${articleIndex}.description`),
      date: translatedDate || baseArticle.date,
      author: baseArticle.author,
      image: baseArticle.image,
      videoUrl: baseArticle.videoUrl,
      videoType: baseArticle.videoType,
      pdfUrl: baseArticle.pdfUrl,
      pdfType: baseArticle.pdfType,
      certificates: baseArticle.certificates
    };    

    if (this.article) {
      this.seoService.updateSEO({
        title: `${this.article.title} | Blog - Rafael Moreno`,
        description: this.article.description || this.article.summary || 'Artículo del blog de Rafael Moreno',
        image: this.article.image || undefined,
        url: `https://rafaelespinozadev.com/section/blog/${id}`,
        type: 'article'
      });

      this.seoService.addSchemaMarkup({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': this.article.title,
        'description': this.article.description || this.article.summary,
        'image': this.article.image || this.seoService.getDefaultImage(),
        'author': {
          '@type': 'Person',
          'name': 'Rafael Moreno'
        },
        'publisher': {
          '@type': 'Person',
          'name': 'Rafael Moreno'
        },
        'datePublished': this.article.date || new Date().toISOString(),
        'url': `https://rafaelespinozadev.com/section/blog/${id}`
      });
    }
  }

  private getArticleIndex(id: string): number {
    const articleIdMap: { [key: string]: number } = {
      'a8a6b977-425c-432e-98c7-024b81ee12a0': 1,
      '70567914-b340-4b50-b5ac-4f54e1aa39f5': 2,
      'f8d3c2a1-9b7e-4f5d-a2c8-1e9d4b6f8a3c': 3,
      '20704830-83d6-49fa-87a2-850fbd32beb5': 4,
      'b8eea21c-ca33-41e7-899e-33d9a31853a2': 5,
      'd1e5f8a9-7b4c-4e2f-9a8d-2c5b7e3f9a1d': 6,
      'a3c7e2b5-9d1f-4a8e-7c3b-5e9f1a7c4d8e': 7,
      'm8l3n4t5-9a6b-7c8d-9e0f-1a2b3c4d5e6f': 8,
      'e9f4n5o6-8b7c-9d0e-1f2a-3b4c5d6e7f8a': 9
    };
    return articleIdMap[id] || 1;
  }

  private getTranslation(key: string): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const value = translations[key]?.[currentLang];
    
    if (!value) {
      // Fallback to Spanish if translation not found
      return (translations[key]?.['es'] as string) || key;
    }
    
    if (typeof value === 'string') {
      return value;
    }
    
    // If it's an array, join it
    return (value as string[]).join(' ');
  }

  shareOnTwitter(): void {
    const text = encodeURIComponent(`Check out this article ${this.article.title}`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  }

  shareOnLinkedIn(): void {
    const urlPage = encodeURIComponent(window.location.href);
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(urlPage)}&title=${encodeURIComponent(this.article.title)}&summary=${encodeURIComponent(this.article.description)}`;
    window.open(url, '_blank');
  }

  copyLink(): void {
    const urlPage = window.location.href;
    const currentLang = this.languageService.getCurrentLanguage();
    const successMsg = currentLang === 'es' ? 'Enlace copiado al portapapeles' : 'Link copied to clipboard';
    const errorMsg = currentLang === 'es' ? 'Error al copiar el enlace' : 'Error copying link';

    navigator.clipboard.writeText(urlPage).then(
      () => alert(successMsg),
      () => alert(errorMsg)
    );
  }

  getReadingTime(text: string): number {
    // Calcular tiempo de lectura aproximado (palabras promedio por minuto: 200)
    if (!text) return 1;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    return readingTime < 1 ? 1 : readingTime;
  }
}

