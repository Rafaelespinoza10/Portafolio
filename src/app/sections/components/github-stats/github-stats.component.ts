import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GithubService } from '../../../services/github.service';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';

@Component({
  selector: 'app-github-stats-component',
  templateUrl: './github-stats.component.html',
  styleUrls: ['./github-stats.component.css']
})
export class GithubStatsComponent implements OnInit, OnDestroy {
  private languageSubscription: Subscription = new Subscription();
  private destroy$ = new Subject<void>();
  
  // Stats data
  userStats: any = null;
  repos: any[] = [];
  languages: any = {};
  contributions: any = null;
  contributionsUrl: string = '';
  contributionsIframeUrl: string = '';
  contributionsHeatmapUrl: string = '';
  activityGraphUrl: string = '';
  contributionsPageUrl: string = '';
  showContributionsFallback: boolean = false;
  loading = true;
  error: string | null = null;
  
  // Translations
  title = translations['githubStats.title']?.['es'] || 'GitHub Stats';
  subtitle = translations['githubStats.subtitle']?.['es'] || 'Mi actividad en GitHub';
  contributionsLabel = translations['githubStats.contributions']?.['es'] || 'Contribuciones';
  activityLabel = translations['githubStats.activity']?.['es'] || 'Actividad de Contribuciones';
  activityTooltip = translations['githubStats.activityTooltip']?.['es'] || 'Muestra tus contribuciones diarias del último año';
  heatmapTooltip = translations['githubStats.heatmapTooltip']?.['es'] || 'Cada cuadrado representa un día con contribuciones';
  lastYearLabel = translations['githubStats.lastYear']?.['es'] || 'Último año';
  lessLabel = translations['githubStats.less']?.['es'] || 'Menos';
  moreLabel = translations['githubStats.more']?.['es'] || 'Más';
  languagesLabel = translations['githubStats.languages']?.['es'] || 'Lenguajes Más Usados';
  repositoriesLabel = translations['githubStats.repositories']?.['es'] || 'Repositorios Destacados';
  viewProfileLabel = translations['githubStats.viewProfile']?.['es'] || 'Ver Perfil Completo en GitHub';
  publicReposLabel = translations['githubStats.publicRepos']?.['es'] || 'Repositorios Públicos';
  followersLabel = translations['githubStats.followers']?.['es'] || 'Seguidores';
  followingLabel = translations['githubStats.following']?.['es'] || 'Siguiendo';
  totalStarsLabel = translations['githubStats.totalStars']?.['es'] || 'Estrellas Totales';
  
  constructor(
    private githubService: GithubService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.loadTranslations();
    this.loadGitHubData();
    
    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(() => {
      this.loadTranslations();
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadTranslations(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.title = translations['githubStats.title']?.[currentLang] as string || 'GitHub Stats';
    this.subtitle = translations['githubStats.subtitle']?.[currentLang] as string || 'My GitHub Activity';
    this.contributionsLabel = translations['githubStats.contributions']?.[currentLang] as string || 'Contributions';
    this.activityLabel = translations['githubStats.activity']?.[currentLang] as string || 'Contribution Activity';
    this.activityTooltip = translations['githubStats.activityTooltip']?.[currentLang] as string || 'Shows your daily contributions from the last year';
    this.heatmapTooltip = translations['githubStats.heatmapTooltip']?.[currentLang] as string || 'Each square represents a day with contributions';
    this.lastYearLabel = translations['githubStats.lastYear']?.[currentLang] as string || 'Last year';
    this.lessLabel = translations['githubStats.less']?.[currentLang] as string || 'Less';
    this.moreLabel = translations['githubStats.more']?.[currentLang] as string || 'More';
    this.languagesLabel = translations['githubStats.languages']?.[currentLang] as string || 'Most Used Languages';
    this.repositoriesLabel = translations['githubStats.repositories']?.[currentLang] as string || 'Featured Repositories';
    this.viewProfileLabel = translations['githubStats.viewProfile']?.[currentLang] as string || 'View Full Profile on GitHub';
    this.publicReposLabel = translations['githubStats.publicRepos']?.[currentLang] as string || 'Public Repositories';
    this.followersLabel = translations['githubStats.followers']?.[currentLang] as string || 'Followers';
    this.followingLabel = translations['githubStats.following']?.[currentLang] as string || 'Following';
    this.totalStarsLabel = translations['githubStats.totalStars']?.[currentLang] as string || 'Total Stars';
  }

  private loadGitHubData(): void {
    this.loading = true;
    this.error = null;
    
    // Load user stats with timeout handling
    this.githubService.getUserStats('rafaelespinoza10')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats: any) => {
          if (stats) {
            this.userStats = stats;
            this.loadRepos();
          } else {
            this.error = 'No se pudieron cargar las estadísticas de GitHub';
            this.loading = false;
          }
        },
        error: (err: any) => {
          this.error = err.message || 'Error al cargar datos de GitHub. Por favor, intenta más tarde.';
          this.loading = false;
          console.error('Error loading user stats:', err);
        }
      });
  }

  private loadRepos(): void {
    this.githubService.getUserRepos('rafaelespinoza10')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (repos: any[]) => {
          this.repos = repos || [];
          this.loadLanguages();
        },
        error: (err: any) => {
          console.error('Error loading repos:', err);
          this.loadLanguages();
        }
      });
  }

  private loadLanguages(): void {
    // Use simple counting from repos to avoid rate limiting and blocking
    const languageMap: any = {};
    this.repos.forEach((repo: any) => {
      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
      }
    });
    this.languages = languageMap;
    
    // Load contributions URLs (these are just strings, no API calls)
    this.contributionsIframeUrl = this.githubService.getContributionsGraphUrl('rafaelespinoza10');
    this.contributionsHeatmapUrl = this.githubService.getContributionsHeatmapUrl('rafaelespinoza10');
    this.activityGraphUrl = this.githubService.getActivityGraphUrl('rafaelespinoza10');
    this.contributionsPageUrl = `https://github.com/rafaelespinoza10`;
    
    this.loading = false;
  }

  getTotalStars(): number {
    return this.repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);
  }

  getTopLanguages(): any[] {
    const langArray = Object.keys(this.languages).map(lang => ({
      name: lang,
      count: this.languages[lang],
      bytes: this.languages[lang] * 1000, // Placeholder
      percentage: 0
    }));

    const total = langArray.reduce((sum, lang) => sum + lang.count, 0);
    langArray.forEach(lang => {
      lang.percentage = total > 0 ? Math.round((lang.count / total) * 100) : 0;
    });

    return langArray
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }

  getTopRepos(): any[] {
    return this.repos
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 6);
  }

  hasLanguages(): boolean {
    return this.languages && Object.keys(this.languages).length > 0;
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
      this.showContributionsFallback = true;
    }
  }

  onIframeError(event: Event): void {
    this.showContributionsFallback = true;
  }

  openContributionsPage(): void {
    window.open(this.contributionsPageUrl, '_blank');
  }

  getLanguageIconUrl(language: string): string {
    // Mapeo de nombres de lenguajes a sus nombres en devicons
    const languageMap: { [key: string]: string } = {
      'TypeScript': 'typescript',
      'JavaScript': 'javascript',
      'Python': 'python',
      'Java': 'java',
      'C++': 'cplusplus',
      'C': 'c',
      'C#': 'csharp',
      'Go': 'go',
      'Rust': 'rust',
      'PHP': 'php',
      'Ruby': 'ruby',
      'Swift': 'swift',
      'Kotlin': 'kotlin',
      'Dart': 'dart',
      'HTML': 'html5',
      'CSS': 'css3',
      'SCSS': 'sass',
      'SASS': 'sass',
      'Vue': 'vuejs',
      'React': 'react',
      'Angular': 'angularjs',
      'Node.js': 'nodejs',
      'Docker': 'docker',
      'Shell': 'bash',
      'PowerShell': 'powershell',
      'Markdown': 'markdown',
      'JSON': 'json',
      'YAML': 'yaml',
      'SQL': 'mysql',
      'R': 'r',
      'MATLAB': 'matlab',
      'Lua': 'lua',
      'Perl': 'perl',
      'Scala': 'scala',
      'Clojure': 'clojure',
      'Haskell': 'haskell',
      'Elixir': 'elixir',
      'Erlang': 'erlang',
      'Objective-C': 'objectivec',
      'Assembly': 'assembly',
      'TeX': 'latex',
      'Jupyter Notebook': 'jupyter',
      'Makefile': 'cmake',
      'CMake': 'cmake'
    };

    const iconName = languageMap[language] || language.toLowerCase();
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
  }

  onLanguageIconError(event: Event, language: string): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      // Fallback: intentar con el nombre en minúsculas
      const fallbackUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${language.toLowerCase()}/${language.toLowerCase()}-original.svg`;
      if (target.src !== fallbackUrl) {
        target.src = fallbackUrl;
      } else {
        // Si falla el fallback, ocultar la imagen
        target.style.display = 'none';
      }
    }
  }
}

