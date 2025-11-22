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
      iconColor: '#61DAFB',
      titleColor: '#61DAFB',
      iconPath: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      technologies: [
        { name: 'React', colors: 'from-[#61DAFB] to-[#4fa3d1]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Next.js', colors: 'from-[#000000] to-[#1a1a1a]', logo: 'https://www.datocms-assets.com/75941/1657707878-nextjs_logo.png' },
        { name: 'Angular', colors: 'from-[#DD0031] to-[#9C1A27]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg' },
        { name: 'TypeScript', colors: 'from-[#3178C6] to-[#1F6BB8]', logo: 'https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg' },
        { name: 'Tailwind CSS', colors: 'from-[#38BDF8] to-[#0EA5E9]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' }
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
      iconColor: '#68A063',
      titleColor: '#68A063',
      iconPath: 'M12 6v12m6-6H6',
      technologies: [
        { name: 'Node.js', colors: 'from-[#68A063] to-[#528D46]', logo: 'https://www.svgrepo.com/show/452075/node-js.svg' },
        { name: 'Express', colors: 'from-[#000000] to-[#333333]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'NestJS', colors: 'from-[#E0234E] to-[#B71C3C]', logo: 'https://nestjs.com/img/logo-small.svg' },
        { name: 'ASP.NET', colors: 'from-[#512BD4] to-[#3B1A8E]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
        { name: 'Entity Framework', colors: 'from-[#FF6B35] to-[#E55A2B]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' }
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
       iconColor: '#A78BFA',
       titleColor: '#A78BFA',
       iconPath: 'M4 6v14a2 2 0 002 2h12a2 2 0 002-2V6M4 6h16M8 10h8',
      technologies: [
        { name: 'MySQL', colors: 'from-[#00758F] to-[#005F73]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'MSSQL', colors: 'from-[#CC2927] to-[#A61E1C]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
        { name: 'MongoDB', colors: 'from-[#47A248] to-[#388E3C]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'PostgreSQL', colors: 'from-[#336791] to-[#2C5282]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' }
      ]
     },
     {
       title: translations['activities.machineLearning.title']['es'],
       description: translations['activities.machineLearning.description']['es'],
       gradientFrom: 'from-[#FF6B35]',
       gradientVia: 'via-[#F7931E]',
       gradientTo: 'to-[#FF8C42]',
       textGradient: 'from-[#FF6B35] to-[#F7931E]',
       hoverShadow: 'hover:shadow-orange-400/50',
       iconColor: '#FF6B35',
       titleColor: '#FF6B35',
       iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      technologies: [
        { name: 'Python', colors: 'from-[#3776AB] to-[#2D5F8F]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'TensorFlow', colors: 'from-[#FF6F00] to-[#FF8F00]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
        { name: 'PyTorch', colors: 'from-[#EE4C2C] to-[#C52719]', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
        { name: 'Scikit-learn', colors: 'from-[#F7931E] to-[#E58200]', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' }
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
    this.activities[3].title = translations['activities.machineLearning.title'][currentLang];
    this.activities[3].description = translations['activities.machineLearning.description'][currentLang];
  }

}
