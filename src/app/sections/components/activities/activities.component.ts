import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';
import * as Aos from 'aos';

@Component({
  selector: 'component-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit, OnDestroy {

  private languageSubscription: Subscription = new Subscription();
  public title = translations['activities.title']['es'];
  public subtitle = translations['activities.subtitle']['es'];
  public subtitleFrontend = translations['activities.subtitleFrontend']['es'];
  public subtitleMid = translations['activities.subtitleMid']['es'];
  public subtitleBackend = translations['activities.subtitleBackend']['es'];
  public subtitleEnd = translations['activities.subtitleEnd']['es'];
  
  public activities = [
    {
      title: translations['activities.frontend.title']['es'],
      description: translations['activities.frontend.description']['es'],
      gradientFrom: 'from-[#61DAFB]',
      gradientVia: 'via-[#4fa3d1]',
      gradientTo: 'to-[#3a8bc4]',
      textGradient: 'from-[#61DAFB] to-[#4fa3d1]',
      hoverShadow: 'hover:shadow-cyan-500/40',
      iconPath: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      technologies: [
        { name: 'React', colors: 'from-[#61DAFB] to-[#4fa3d1]' },
        { name: 'Angular', colors: 'from-[#DD0031] to-[#9C1A27]' },
        { name: 'TypeScript', colors: 'from-[#3178C6] to-[#1F6BB8]' },
        { name: 'Tailwind CSS', colors: 'from-[#38BDF8] to-[#0EA5E9]' }
      ]
    },
    {
      title: translations['activities.backend.title']['es'],
      description: translations['activities.backend.description']['es'],
      gradientFrom: 'from-[#68A063]',
      gradientVia: 'via-[#528D46]',
      gradientTo: 'to-[#3d6b38]',
      textGradient: 'from-[#68A063] to-[#528D46]',
      hoverShadow: 'hover:shadow-green-500/40',
      iconPath: 'M12 6v12m6-6H6',
      technologies: [
        { name: 'Node.js', colors: 'from-[#68A063] to-[#528D46]' },
        { name: 'Express', colors: 'from-[#000000] to-[#333333]' },
        { name: 'ASP.NET', colors: 'from-[#512BD4] to-[#3B1A8E]' },
        { name: 'Entity Framework', colors: 'from-[#FF6B35] to-[#E55A2B]' }
      ]
    },
         {
       title: translations['activities.database.title']['es'],
       description: translations['activities.database.description']['es'],
       gradientFrom: 'from-[#8B5CF6]',
       gradientVia: 'via-[#7C3AED]',
       gradientTo: 'to-[#6D28D9]',
       textGradient: 'from-[#A78BFA] to-[#8B5CF6]',
       hoverShadow: 'hover:shadow-purple-400/50',
       iconPath: 'M4 6v14a2 2 0 002 2h12a2 2 0 002-2V6M4 6h16M8 10h8',
       technologies: [
         { name: 'MySQL', colors: 'from-[#00758F] to-[#005F73]' },
         { name: 'MSSQL', colors: 'from-[#CC2927] to-[#A61E1C]' },
         { name: 'MongoDB', colors: 'from-[#47A248] to-[#388E3C]' },
         { name: 'PostgreSQL', colors: 'from-[#336791] to-[#2C5282]' }
       ]
     }
  ];

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

    Aos.init({
      duration: 5000,
      easing: 'ease-in-out',
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  private loadTranslations(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.title = translations['activities.title'][currentLang];
    this.subtitle = translations['activities.subtitle'][currentLang];
    this.subtitleFrontend = translations['activities.subtitleFrontend'][currentLang];
    this.subtitleMid = translations['activities.subtitleMid'][currentLang];
    this.subtitleBackend = translations['activities.subtitleBackend'][currentLang];
    this.subtitleEnd = translations['activities.subtitleEnd'][currentLang];
    
    // Actualizar actividades
    this.activities[0].title = translations['activities.frontend.title'][currentLang];
    this.activities[0].description = translations['activities.frontend.description'][currentLang];
    this.activities[1].title = translations['activities.backend.title'][currentLang];
    this.activities[1].description = translations['activities.backend.description'][currentLang];
    this.activities[2].title = translations['activities.database.title'][currentLang];
    this.activities[2].description = translations['activities.database.description'][currentLang];
  }

}
