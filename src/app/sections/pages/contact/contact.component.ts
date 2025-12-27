import { Component, OnInit } from '@angular/core';
import { SEOService } from '../../../services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: ``
})
export class ContactPageComponent implements OnInit {

  constructor(private seoService: SEOService) {}

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Contacto | Rafael Moreno - Full Stack Developer',
      description: 'Contacta con Rafael Moreno, Full Stack Developer. Envíame un mensaje para proyectos, colaboraciones o consultas profesionales.',
      url: 'https://rafaelespinozadev.com/section/contact'
    });
  }
}
