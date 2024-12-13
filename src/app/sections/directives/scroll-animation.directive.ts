import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
})
export class ScrollAnimationDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Elemento visible:', entry.target);

            // Reinicia la animación
            this.renderer.removeClass(this.el.nativeElement, 'show');
            setTimeout(() => {
              this.renderer.addClass(this.el.nativeElement, 'show');
            }, 500); // Timeout para forzar el reinicio
          }
        });
      },
      { threshold: 0.1 } // Ejecuta la lógica cuando el 10% del elemento es visible
    );

    observer.observe(this.el.nativeElement);
  }
}
