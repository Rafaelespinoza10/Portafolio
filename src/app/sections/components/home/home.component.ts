import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';

@Component({
  selector: 'components-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) { }

  private typingInterval: any = null;
  private languageSubscription: Subscription = new Subscription();
  public messages: string[] = [];
  public animatedText = '';
  public typingSpeed: number = 50;
  public delayBetweenMessages: number = 1000;

  ngOnInit() {
    // Cargar mensajes iniciales
    this.loadMessages();
    this.startTypingEffect();
    
    // Suscribirse a cambios de idioma (usando skip(1) para saltar el primer valor)
    this.languageSubscription.add(
      this.languageService.currentLanguage$.pipe(
        skip(1)
      ).subscribe(() => {
        this.loadMessages();
        this.clearTypingEffect();
        setTimeout(() => this.startTypingEffect(), 100);
      })
    );
  }

  private loadMessages() {
    const currentLang = this.languageService.getCurrentLanguage();
    
    this.messages = [
      translations['home.message1'][currentLang] as string,
      translations['home.message2'][currentLang] as string,
      translations['home.message3'][currentLang] as string,
      translations['home.message4'][currentLang] as string
    ];
  }

  ngAfterViewInit() {
    const tl = gsap.timeline();

    tl.from('.hero-title', {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-button', {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.3');

    gsap.to('.floating-element', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.2
    });
  }

  ngOnDestroy() {
    gsap.killTweensOf('*');
    this.clearTypingEffect();
    this.languageSubscription.unsubscribe();
  }
  private clearTypingEffect() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
    this.animatedText = '';
  }
  startTypingEffect() {
    let messageIndex = 0;

    const typeMessage = () => {
      if (messageIndex < this.messages.length) {
        let index = 0;
        const message = this.messages[messageIndex];
        this.animatedText = '';

        this.typingInterval = setInterval(() => {
          this.animatedText += message[index];
          index++;

          if (index === message.length) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
            messageIndex++;

            setTimeout(() => typeMessage(), this.delayBetweenMessages);
          }
        }, this.typingSpeed);
      }
    };

    typeMessage();
  }

  onSubmit(){
    gsap.to('.hero-content', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        this.router.navigate(['section', 'about-me']);
      }
    });
  }
}
