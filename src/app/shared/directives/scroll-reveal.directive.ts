import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugin
gsap.registerPlugin(ScrollTrigger);

@Directive({
  selector: '[appScrollReveal]'
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() appScrollReveal: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'zoom' | 'flip' = 'fade';
  @Input() duration: number = 1;
  @Input() delay: number = 0;
  
  private scrollTrigger?: ScrollTrigger;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.applyAnimation();
  }

  ngOnDestroy() {
    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
    }
  }

  private applyAnimation() {
    const element = this.el.nativeElement;
    
    if (!element) {
      return;
    }
    
    let fromVars: gsap.TweenVars = { opacity: 0 };

    // Configurar animación según el tipo
    switch (this.appScrollReveal) {
      case 'fade':
        fromVars = { opacity: 0 };
        break;
      case 'slide-up':
        fromVars = { opacity: 0, y: 100 };
        break;
      case 'slide-left':
        fromVars = { opacity: 0, x: -100 };
        break;
      case 'slide-right':
        fromVars = { opacity: 0, x: 100 };
        break;
      case 'zoom':
        fromVars = { opacity: 0, scale: 0.5 };
        break;
      case 'flip':
        fromVars = { opacity: 0, rotationY: 90 };
        break;
    }

    // Aplicar animación con ScrollTrigger
    gsap.from(element, {
      ...fromVars,
      duration: this.duration,
      delay: this.delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse'
      }
    });
  }
}

