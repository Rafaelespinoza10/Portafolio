import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-LayoutPage',
  templateUrl: './LayoutPage.component.html',
  styleUrls: ['./LayoutPage.component.css']
  
})
export class LayoutPageComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
    // Escuchar los cambios de ruta
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        // Hacer scroll al inicio cuando cambie la ruta
        this.scrollToTop();
      });
  }

  ngAfterViewInit() {
    // Hacer scroll al inicio al cargar la página por primera vez
    this.scrollToTop();
  }

  private scrollToTop(): void {
    // Usar el contenedor con scroll si existe
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = 0;
    } else {
      // Fallback: usar window.scrollTo como respaldo
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

}
