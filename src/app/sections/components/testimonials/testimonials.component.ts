import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { TestimonialModalService } from '../../../services/testimonial-modal.service';
import { FirebaseService } from '../../../services/firebase.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { translations } from '../../../i18n/translations';
import Swal from 'sweetalert2';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  comment: string;
  date: string;
  rating?: number;
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials: Testimonial[] = [];
  private languageSubscription: Subscription = new Subscription();
  private testimonialAddedSubscription: Subscription = new Subscription();

  // Translated properties
  public title = translations['testimonials.title']['es'];
  public subtitle = translations['testimonials.subtitle']['es'];
  public addButton = translations['testimonials.addButton']['es'];
  public saveSuccessTitle = translations['testimonials.saveSuccess']['es'];
  public saveSuccessText = translations['testimonials.saveSuccessText']['es'];
  public saveErrorTitle = translations['testimonials.saveError']['es'];
  public saveErrorText = translations['testimonials.saveErrorText']['es'];

  constructor(
    private languageService: LanguageService,
    private testimonialModalService: TestimonialModalService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.loadTranslations();
    this.loadTestimonials();
    
    this.languageSubscription.add(
      this.languageService.currentLanguage$.pipe(
        skip(1)
      ).subscribe(() => {
        this.loadTranslations();
      })
    );

    // Suscribirse a los testimonios agregados
    this.testimonialAddedSubscription = this.testimonialModalService.testimonialAdded$.subscribe(
      (newTestimonial: any) => {
        this.onTestimonialAdded(newTestimonial);
      }
    );
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
    this.testimonialAddedSubscription.unsubscribe();
  }

     private loadTranslations(): void {
     const currentLang = this.languageService.getCurrentLanguage();
     this.title = translations['testimonials.title'][currentLang] as string;
     this.subtitle = translations['testimonials.subtitle'][currentLang] as string;
     this.addButton = translations['testimonials.addButton'][currentLang] as string;
     this.saveSuccessTitle = translations['testimonials.saveSuccess'][currentLang] as string;
     this.saveSuccessText = translations['testimonials.saveSuccessText'][currentLang] as string;
     this.saveErrorTitle = translations['testimonials.saveError'][currentLang] as string;
     this.saveErrorText = translations['testimonials.saveErrorText'][currentLang] as string;
   }

     async loadTestimonials(): Promise<void> {
     try {
       const firebaseTestimonials = await this.firebaseService.getTestimonials();
       this.testimonials = firebaseTestimonials;
     } catch (error) {
       this.testimonials = [];
     }
   }

  showFormDialog(): void {
    this.testimonialModalService.openModal();
  }

     async onTestimonialAdded(newTestimonial: any): Promise<void> {
     try {
       await this.firebaseService.addTestimonial(newTestimonial);
       
       const testimonialWithId: Testimonial = {
         id: this.testimonials.length + 1,
         ...newTestimonial
       };
       
       this.testimonials.push(testimonialWithId);
       
        Swal.fire({
          title: this.saveSuccessTitle as string,
          text: this.saveSuccessText as string,
          icon: 'success',
          confirmButtonColor: '#997fff',
          confirmButtonText: 'Ok',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire({
          title: this.saveErrorTitle as string,
          text: this.saveErrorText as string,
          icon: 'error',
          confirmButtonColor: '#997fff',
          confirmButtonText: 'Ok'
        });
     }
   }

   formatDate(dateString: string): string {
     const currentLang = this.languageService.getCurrentLanguage();
     const date = new Date(dateString);
     
     if (currentLang === 'es') {
       return date.toLocaleDateString('es-ES', { 
         year: 'numeric', 
         month: 'long', 
         day: 'numeric' 
       });
     } else {
       return date.toLocaleDateString('en-US', { 
         year: 'numeric', 
         month: 'long', 
         day: 'numeric' 
       });
     }
   }

}
