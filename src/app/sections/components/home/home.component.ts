import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'components-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private router:Router,) { }

  messages = [
    'Hola, soy Rafael',
    'Soy Ingeniero en Mecatrónica',
    'Soy desarrollador de software',
    'Me gusta la programación y el café'
  ];

  public animatedText = '';
  public typingSpeed: number = 50;
  public delayBetweenMessages: number = 1000; // Tiempo entre mensajes (en milisegundos)

  ngOnInit() {
    this.startTypingEffect();
  }

  ngAfterViewInit() {
    // Animaciones GSAP para entrada del hero
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

    // Animación de partículas flotantes (si tienes un elemento de fondo)
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
    // Limpiar animaciones de GSAP
    gsap.killTweensOf('*');
  }

  startTypingEffect() {
    let messageIndex = 0;

    const typeMessage = () => {
      if (messageIndex < this.messages.length) {
        let index = 0;
        const message = this.messages[messageIndex];
        this.animatedText = ''; // Limpiar texto previo

        const interval = setInterval(() => {
          this.animatedText += message[index];
          index++;

          if (index === message.length) {
            clearInterval(interval);
            messageIndex++;

            setTimeout(() => typeMessage(), this.delayBetweenMessages);
          }
        }, this.typingSpeed);
      }
    };

    typeMessage();
  }

  onSubmit(){
    // Animación de salida antes de navegar
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
