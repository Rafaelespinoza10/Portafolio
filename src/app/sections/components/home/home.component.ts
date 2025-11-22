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
  private pendingTimeout: any = null;
  private languageSubscription: Subscription = new Subscription();
  public messages: string[] = [];
  public animatedText = '';
  public typingSpeed: number = 50;
  public delayBetweenMessages: number = 1000;
  private isDestroyed: boolean = false;

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
    
    // Cargar mensajes con validación para evitar undefined
    const message1 = translations['home.message1']?.[currentLang] as string;
    const message2 = translations['home.message2']?.[currentLang] as string;
    const message3 = translations['home.message3']?.[currentLang] as string;
    const message4 = translations['home.message4']?.[currentLang] as string;
    
    // Filtrar mensajes válidos (que existan y no sean undefined)
    this.messages = [
      message1,
      message2,
      message3,
      message4
    ].filter(msg => msg && typeof msg === 'string' && msg.trim().length > 0);
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
    // Limpiar intervalo de typing
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
    
    // Limpiar timeout pendiente
    if (this.pendingTimeout) {
      clearTimeout(this.pendingTimeout);
      this.pendingTimeout = null;
    }
    
    // Resetear texto animado
    this.animatedText = '';
  }
  startTypingEffect() {
    // Validar que hay mensajes antes de empezar
    if (!this.messages || this.messages.length === 0) {
      return;
    }

    let messageIndex = 0;

    const typeMessage = () => {
      // Validar que no esté destruido y que haya mensajes
      if (this.isDestroyed || !this.messages || messageIndex >= this.messages.length) {
        return;
      }

      const message = this.messages[messageIndex];
      
      // Validar que el mensaje existe y es válido
      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        messageIndex++;
        // Intentar con el siguiente mensaje si existe
        if (messageIndex < this.messages.length) {
          this.pendingTimeout = setTimeout(() => typeMessage(), this.delayBetweenMessages);
        }
        return;
      }

      let index = 0;
      this.animatedText = '';

      // Limpiar cualquier intervalo previo antes de crear uno nuevo
      if (this.typingInterval) {
        clearInterval(this.typingInterval);
        this.typingInterval = null;
      }

      this.typingInterval = setInterval(() => {
        // Validar que no esté destruido
        if (this.isDestroyed) {
          clearInterval(this.typingInterval);
          this.typingInterval = null;
          return;
        }

        // Validar que el índice sea válido
        if (index < message.length) {
          this.animatedText += message[index];
          index++;
        }

        if (index >= message.length) {
          clearInterval(this.typingInterval);
          this.typingInterval = null;
          messageIndex++;

          // Si hay más mensajes, continuar después del delay
          if (messageIndex < this.messages.length) {
            this.pendingTimeout = setTimeout(() => typeMessage(), this.delayBetweenMessages);
          }
        }
      }, this.typingSpeed);
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
