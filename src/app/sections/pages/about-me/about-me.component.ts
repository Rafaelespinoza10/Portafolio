import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';
import * as Aos from 'aos';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  animations:[
    trigger('fadeIn', [
      transition('enter',[
        style({opacity: 0}),
        animate('2s', style({opacity: 1}))
      ])
    ])
  ]
})
export class AboutMePageComponent implements OnInit, OnDestroy {

  private languageSubscription: Subscription = new Subscription();
  public title = translations['aboutMePage.title']['es'];
  public subtitle = translations['aboutMePage.subtitle']['es'];

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
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
      duration: 2000,  // Duración de la animación
      easing: 'ease-in-out',  // Tipo de transición
      once: false  // Solo ejecuta la animación una vez
    });

    Aos.refresh();  // Refresca las animaciones
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  private loadTranslations(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.title = translations['aboutMePage.title'][currentLang];
    this.subtitle = translations['aboutMePage.subtitle'][currentLang];
  }
}



