import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';

@Component({
  selector: 'component-information-experience',
  templateUrl: './information-experience.component.html',
  styleUrl: './information-experience.component.css'
})
export class InformationExperienceComponent implements OnInit, OnDestroy {
  private languageSubscription: Subscription = new Subscription();
  
  experiences: any[] = [];

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.loadExperiences();
    
    this.languageSubscription.add(
      this.languageService.currentLanguage$.pipe(
        skip(1)
      ).subscribe(() => {
        this.loadExperiences();
      })
    );
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  private loadExperiences(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    const currentText = translations['experience.duration.current'][currentLang];
    
    this.experiences = [
      {
        companyName: 'BoletoMóvil',
        logoSrc:'https://play-lh.googleusercontent.com/MsrwSJKoY6Xp9CThBeNKn7dvTwbvBbTpcjxKOp5A-Q5VpgT0NA4zvktTngy2dX8m8mk',
        jobTitle: translations['experience.boletoMovil.jobTitle'][currentLang],
        description: [
          translations['experience.boletoMovil.desc1'][currentLang],
          translations['experience.boletoMovil.desc2'][currentLang],
          translations['experience.boletoMovil.desc3'][currentLang],
          translations['experience.boletoMovil.desc4'][currentLang],
          translations['experience.boletoMovil.desc5'][currentLang],
          translations['experience.boletoMovil.desc6'][currentLang]
        ],
        duration: `Jul 2025 - ${currentText}`
      },
      {
        companyName: 'Cosma Magna S.L.P.',
        logoSrc: 'https://pbs.twimg.com/media/EwN7tXlWUAINJ3z.jpg',
        jobTitle: translations['experience.cosma.jobTitle'][currentLang],
        description: [
          translations['experience.cosma.desc1'][currentLang],
          translations['experience.cosma.desc2'][currentLang],
          translations['experience.cosma.desc3'][currentLang],
          translations['experience.cosma.desc4'][currentLang]
        ],
        duration: 'Sep 2024 - Jul 2025'
      },
      {
        companyName: 'PEASA',
        logoSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5YSaKJMrF2wUapDC2kv73AxiScL5HKMKT2w&s',
        jobTitle: translations['experience.peasa.jobTitle'][currentLang],
        description: [
          translations['experience.peasa.desc1'][currentLang],
          translations['experience.peasa.desc2'][currentLang],
          translations['experience.peasa.desc3'][currentLang],
          translations['experience.peasa.desc4'][currentLang]
        ],
        duration: 'Ene 2024 - Jul 2024'
      },
      {
        companyName: 'Laboratorio de Ingeniería de Control, UASLP',
        logoSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQli_bQUEepcIMxQNF5UGbF_JxMcUAxeY7wQ&s',
        jobTitle: translations['experience.uaslp.jobTitle'][currentLang],
        description: [
          translations['experience.uaslp.desc1'][currentLang],
          translations['experience.uaslp.desc2'][currentLang],
          translations['experience.uaslp.desc3'][currentLang]
        ],
        duration: 'Ene 2023 - May 2024'
      }
    ];
  }
}
