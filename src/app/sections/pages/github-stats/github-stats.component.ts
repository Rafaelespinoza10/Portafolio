import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';

@Component({
  selector: 'app-github-stats',
  templateUrl: './github-stats.component.html',
  styleUrls: ['./github-stats.component.css']
})
export class GithubStatsPageComponent implements OnInit, OnDestroy {
  private languageSubscription: Subscription = new Subscription();
  public title = translations['githubStats.title']?.['es'] || 'GitHub Stats';
  public subtitle = translations['githubStats.subtitle']?.['es'] || 'Mi actividad en GitHub';

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.loadTranslations();
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(() => {
      this.loadTranslations();
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  private loadTranslations(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.title = translations['githubStats.title']?.[currentLang] || 'GitHub Stats';
    this.subtitle = translations['githubStats.subtitle']?.[currentLang] || 'My GitHub Activity';
  }
}

