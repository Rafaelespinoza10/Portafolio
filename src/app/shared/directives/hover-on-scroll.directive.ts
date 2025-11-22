import { Directive, ElementRef, Renderer2, AfterViewInit, OnDestroy, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverOnScroll]'
})
export class HoverOnScrollDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private isMobile = false;
  private wasVisible = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // Detectar si es móvil
    this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
  }

  ngAfterViewInit() {
    // Solo aplicar en móviles
    if (!this.isMobile) {
      return;
    }

    // Esperar un poco para asegurar que el DOM esté listo
    setTimeout(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.wasVisible) {
              // Agregar clase que active los efectos hover
              this.renderer.addClass(this.el.nativeElement, 'is-visible');
              this.wasVisible = true;
              
              // También agregar clase a elementos hijos con group
              const groupElements = this.el.nativeElement.querySelectorAll('.group');
              groupElements.forEach((el: HTMLElement) => {
                this.renderer.addClass(el, 'is-visible');
              });
              
              // Para proyectos del portafolio (que tienen transform-style: preserve-3d o glass-card), agregar clase para giro
              const style = this.el.nativeElement.getAttribute('style') || '';
              const computedStyle = window.getComputedStyle(this.el.nativeElement);
              const hasPreserve3d = style.includes('transform-style: preserve-3d') || 
                                   computedStyle.transformStyle === 'preserve-3d' ||
                                   this.el.nativeElement.classList.contains('glass-card');
              
              // Verificar si es un proyecto del portafolio
              const isPortfolioCard = this.el.nativeElement.closest('.project-card') !== null ||
                                     this.el.nativeElement.classList.contains('glass-card');
              
              if (hasPreserve3d || isPortfolioCard) {
                this.renderer.addClass(this.el.nativeElement, 'portfolio-card-visible');
              }
            } else if (!entry.isIntersecting && this.wasVisible) {
              // Remover clase cuando sale del viewport
              this.renderer.removeClass(this.el.nativeElement, 'is-visible');
              this.wasVisible = false;
              
              // Remover clase de elementos hijos
              const groupElements = this.el.nativeElement.querySelectorAll('.group');
              groupElements.forEach((el: HTMLElement) => {
                this.renderer.removeClass(el, 'is-visible');
              });
              
              // Remover clase de giro de proyectos
              this.renderer.removeClass(this.el.nativeElement, 'portfolio-card-visible');
            }
          });
        },
        {
          threshold: 0.4, // Activa cuando el 40% del elemento es visible
          rootMargin: '0px 0px -5% 0px' // Activa un poco antes de que esté completamente visible
        }
      );

      this.observer.observe(this.el.nativeElement);
    }, 100);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

