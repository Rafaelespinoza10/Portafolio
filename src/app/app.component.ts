import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestimonialModalService } from './services/testimonial-modal.service';
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

  constructor(private testimonialModalService: TestimonialModalService) {}

  ngOnInit(): void {
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
