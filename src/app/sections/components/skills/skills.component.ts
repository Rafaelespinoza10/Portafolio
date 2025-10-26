import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';

interface Skill {
  id: number;
  name: string;
  level: string;
  icon: string;
  gradient: {
    from: string;
    to: string;
  };
  textGradient: {
    from: string;
    to: string;
  };
  shadowColor: string;
}

@Component({
  selector: 'components-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit, OnDestroy {
  private languageSubscription: Subscription = new Subscription();
  
  skills: Skill[] = [];

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.loadSkills();
    
    this.languageSubscription.add(
      this.languageService.currentLanguage$.pipe(
        skip(1)
      ).subscribe(() => {
        this.loadSkills();
      })
    );
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  private loadSkills(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    
    this.skills = [
      {
        id: 1,
        name: translations['skills.spanish.name'][currentLang] as string,
        level: translations['skills.spanish.level'][currentLang] as string,
        icon: 'M12 11c2.5 0 4.5-2 4.5-4.5S14.5 2 12 2 7.5 4 7.5 6.5 9.5 11 12 11zm0 1c-3 0-6.4 1.5-6.4 4.5 0 .6.4 1 1 1h10.8c.6 0 1-.4 1-1 0-3-3.4-4.5-6.4-4.5z',
        gradient: { from: 'indigo-600', to: 'blue-600' },
        textGradient: { from: 'indigo-400', to: 'blue-400' },
        shadowColor: 'shadow-indigo-500/20'
      },
      {
        id: 2,
        name: translations['skills.english.name'][currentLang] as string,
        level: translations['skills.english.level'][currentLang] as string,
        icon: 'M12 11c2.5 0 4.5-2 4.5-4.5S14.5 2 12 2 7.5 4 7.5 6.5 9.5 11 12 11zm0 1c-3 0-6.4 1.5-6.4 4.5 0 .6.4 1 1 1h10.8c.6 0 1-.4 1-1 0-3-3.4-4.5-6.4-4.5z',
        gradient: { from: 'green-600', to: 'emerald-600' },
        textGradient: { from: 'green-400', to: 'emerald-400' },
        shadowColor: 'shadow-green-500/20'
      },
      {
        id: 3,
        name: translations['skills.ml.name'][currentLang] as string,
        level: translations['skills.ml.level'][currentLang] as string,
        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
        gradient: { from: 'purple-600', to: 'pink-600' },
        textGradient: { from: 'purple-400', to: 'pink-400' },
        shadowColor: 'shadow-purple-500/20'
      },
      {
        id: 4,
        name: translations['skills.dataAnalysis.name'][currentLang] as string,
        level: translations['skills.dataAnalysis.level'][currentLang] as string,
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        gradient: { from: 'orange-600', to: 'red-600' },
        textGradient: { from: 'orange-400', to: 'red-400' },
        shadowColor: 'shadow-orange-500/20'
      },
      {
        id: 5,
        name: translations['skills.mobile.name'][currentLang] as string,
        level: translations['skills.mobile.level'][currentLang] as string,
        icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
        gradient: { from: 'cyan-600', to: 'blue-600' },
        textGradient: { from: 'cyan-400', to: 'blue-400' },
        shadowColor: 'shadow-cyan-500/20'
      }
    ];
  }

  getSkillColor(skill: Skill): string {
    const colorMap: { [key: string]: string } = {
      'indigo-400': '#818cf8',
      'green-400': '#4ade80',
      'purple-400': '#c084fc',
      'orange-400': '#fb923c',
      'cyan-400': '#22d3ee'
    };
    
    return colorMap[skill.textGradient.from] || '#ffffff';
  }

}
