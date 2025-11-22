import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';

@Component({
  selector: 'component-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit, OnDestroy {

  private languageSubscription: Subscription = new Subscription();
  private nameInterval: any = null;
  private descriptionInterval: any = null;
  public name = translations['aboutMe.name']['es'];
  public description = translations['aboutMe.description']['es'];
  public animatedTextName = '';
  public animatedTexDescription = '';
  public typingSpeed: number = 50;
  public downloadCVText = translations['aboutMe.downloadCV']['es'];
  public toolsText = translations['aboutMe.tools']['es'];
  public toolDescriptions: any = {};
  public tools: any[] = [];

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    // Cargar mensajes iniciales
    this.loadTranslations();
    this.startTyppingEffect('name', this.name as string);
    this.startTyppingEffect('description', this.description as string);
    
    // Suscribirse a cambios de idioma
    this.languageSubscription.add(
      this.languageService.currentLanguage$.pipe(
        skip(1)
      ).subscribe(() => {
        this.loadTranslations();
        this.clearTyppingEffect();
        setTimeout(() => {
          this.startTyppingEffect('name', this.name as string);
          this.startTyppingEffect('description', this.description as string);
        }, 100);
      })
    );
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  private loadTranslations(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.name = translations['aboutMe.name'][currentLang];
    this.description = translations['aboutMe.description'][currentLang];
    this.downloadCVText = translations['aboutMe.downloadCV'][currentLang];
    this.toolsText = translations['aboutMe.tools'][currentLang];
    
    // Cargar descripciones de herramientas
    this.toolDescriptions = {
      angular: translations['aboutMe.angular.desc'][currentLang],
      typescript: translations['aboutMe.typescript.desc'][currentLang],
      react: translations['aboutMe.react.desc'][currentLang],
      javascript: translations['aboutMe.javascript.desc'][currentLang],
      net: translations['aboutMe.net.desc'][currentLang],
      nodejs: translations['aboutMe.nodejs.desc'][currentLang],
      python: translations['aboutMe.python.desc'][currentLang],
      nestjs: translations['aboutMe.nestjs.desc'][currentLang],
      nextjs: translations['aboutMe.nextjs.desc'][currentLang]
    };

    // Crear array de herramientas
    this.tools = [
      {
        id: 'angular',
        name: 'Angular',
        description: this.toolDescriptions.angular,
        gradientClass: 'bg-gradient-to-t from-[#DD0031] to-[#9C1A27]',
        hoverShadowClass: 'hover:shadow-2xl hover:shadow-red-500/30',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg'
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        description: this.toolDescriptions.typescript,
        gradientClass: 'bg-gradient-to-t from-[#3178C6] to-[#1F6BB8]',
        hoverShadowClass: 'hover:shadow-2xl hover:shadow-blue-500/30',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png'
      },
      {
        id: 'react',
        name: 'React',
        description: this.toolDescriptions.react,
        gradientClass: 'bg-gradient-to-t from-[#61DAFB] to-[#4fa3d1]',
        hoverShadowClass: 'hover:shadow-2xl hover:shadow-cyan-500/30',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        description: this.toolDescriptions.javascript,
        gradientClass: 'bg-gradient-to-t from-[#F7DF1E] to-[#E0C000]',
        hoverShadowClass: 'hover:shadow-2xl hover:shadow-yellow-500/30',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'
      },
      {
        id: 'net',
        name: '.NET',
        description: this.toolDescriptions.net,
        gradientClass: 'bg-gradient-to-t from-[#5C2D91] to-[#462072]',
        hoverShadowClass: 'hover:shadow-2xl hover:shadow-purple-500/30',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Microsoft_.NET_logo.svg/2048px-Microsoft_.NET_logo.svg.png',
        textColor: 'text-gray-300/80'
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        description: this.toolDescriptions.nodejs,
        gradientClass: 'bg-gradient-to-t from-[#68A063] to-[#528D46]',
        hoverShadowClass: 'hover:shadow-2xl hover:shadow-green-500/30',
        logo: 'https://www.svgrepo.com/show/452075/node-js.svg'
      },
      {
        id: 'python',
        name: 'Python',
        description: this.toolDescriptions.python,
        gradientClass: 'bg-gradient-to-t from-[#3776AB] to-[#2D5F8F]',
        hoverShadowClass: 'hover:shadow-2xl hover:shadow-blue-500/30',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
      },
      {
        id: 'nestjs',
        name: 'NestJS',
        description: this.toolDescriptions.nestjs,
        gradientClass: 'bg-gradient-to-t from-[#E0234E] to-[#B71C3C]',
        hoverShadowClass: 'hover:shadow-2xl hover:shadow-red-500/30',
        logo: 'https://nestjs.com/img/logo-small.svg'
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        description: this.toolDescriptions.nextjs,
        gradientClass: 'bg-gradient-to-t from-[#000000] to-[#1a1a1a]',
        hoverShadowClass: 'hover:shadow-2xl hover:shadow-gray-500/30',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
      }
    ];
  }

  private clearTyppingEffect(): void {
    if (this.nameInterval) {
      clearInterval(this.nameInterval);
      this.nameInterval = null;
    }
    if (this.descriptionInterval) {
      clearInterval(this.descriptionInterval);
      this.descriptionInterval = null;
    }
    this.animatedTextName = '';
    this.animatedTexDescription = '';
  }

  startTyppingEffect(target: 'name' | 'description', text: string){
    let index = 0;
    const interval = setInterval(() =>{
      if(target === 'name'){
        this.animatedTextName += text[index];
      }else{
        this.animatedTexDescription += text[index];
      }
      index++;
      if(index === text.length){
        clearInterval(interval);
        if (target === 'name') {
          this.nameInterval = null;
        } else {
          this.descriptionInterval = null;
        }
      }
    }, this.typingSpeed);

    // Guardar referencia al intervalo
    if (target === 'name') {
      this.nameInterval = interval;
    } else {
      this.descriptionInterval = interval;
    }
  }
  downloadCVs(){
    const files = [
      { url: 'files/CV_RafaelMoreno_English.pdf', name: 'CV_RafaelMoreno_EngMechatronics' },
      { url: 'files/CV_RafaelMoreno_spanish.pdf', name: 'CV_RafaelMoreno_IngMecatronica.pdf' }
    ];

    files.forEach(file => {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

}
