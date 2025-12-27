import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestimonialModalService } from './services/testimonial-modal.service';
import { SEOService } from './services/seo.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Rafael Moreno | Portafolio';
  showTestimonialModal = false;
  private modalSubscription?: Subscription;

  constructor(
    private testimonialModalService: TestimonialModalService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    // SEO inicial
    this.seoService.updateSEO({
      title: 'Rafael Moreno | Full Stack Developer - Portafolio',
      description: 'Full Stack Developer especializado en Angular, React, Node.js, Machine Learning y desarrollo de aplicaciones web modernas.',
      url: 'https://rafaelespinozadev.com/'
    });
    
    this.seoService.addPersonSchema();
    this.seoService.addWebSiteSchema();

    this.modalSubscription = this.testimonialModalService.showModal$.subscribe(
      (show: boolean) => {
        this.showTestimonialModal = show;
      }
    );
  }

  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }

  closeTestimonialModal(): void {
    this.testimonialModalService.closeModal();
  }
}