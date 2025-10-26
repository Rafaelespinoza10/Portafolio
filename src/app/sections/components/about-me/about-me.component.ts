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
      nodejs: translations['aboutMe.nodejs.desc'][currentLang]
    };
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
