import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';

@Component({
  selector: 'component-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.css']
})
export class ContactInformationComponent implements OnInit, OnDestroy {

  private languageSubscription: Subscription = new Subscription();
  public email = 'rafael.moreno.espinoza10@gmail.com';
  public phone = '(444)-225-6573';
  public location = 'San Luis Potosi, Mexico';
  public title = translations['contactInfo.title']['es'];
  public subtitle = translations['contactInfo.subtitle']['es'];
  public emailTitle = translations['contactInfo.email.title']['es'];
  public phoneTitle = translations['contactInfo.phone.title']['es'];
  public locationTitle = translations['contactInfo.location.title']['es'];

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
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  private loadTranslations(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.title = translations['contactInfo.title'][currentLang] as string;
    this.subtitle = translations['contactInfo.subtitle'][currentLang] as string;
    this.emailTitle = translations['contactInfo.email.title'][currentLang];
    this.phoneTitle = translations['contactInfo.phone.title'][currentLang];
    this.locationTitle = translations['contactInfo.location.title'][currentLang];
  }

}
