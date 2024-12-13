import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class AboutMePageComponent implements OnInit  {

  ngOnInit(): void {
    Aos.init({
      duration: 2000,  // Duración de la animación
      easing: 'ease-in-out',  // Tipo de transición
      once: false  // Solo ejecuta la animación una vez
    });

    Aos.refresh();  // Refresca las animaciones

  }


  }



