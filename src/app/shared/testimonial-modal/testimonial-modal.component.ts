import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { TestimonialModalService } from '../../services/testimonial-modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../i18n/translations';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-testimonial-modal',
  templateUrl: './testimonial-modal.component.html',
  styleUrls: ['./testimonial-modal.component.css']
})
export class TestimonialModalComponent implements OnInit, OnDestroy {
  showModal = false;
  testimonialForm: FormGroup;
  selectedRating = 0;
  private subscription?: Subscription;
  private languageSubscription: Subscription = new Subscription();

  // Translated properties
  public formTitle = translations['testimonials.formTitle']['es'];
  public formSubtitle = translations['testimonials.formSubtitle']['es'];
  public nameLabel = translations['testimonials.nameLabel']['es'];
  public nameError = translations['testimonials.nameError']['es'];
  public positionLabel = translations['testimonials.positionLabel']['es'];
  public positionError = translations['testimonials.positionError']['es'];
  public companyLabel = translations['testimonials.companyLabel']['es'];
  public companyError = translations['testimonials.companyError']['es'];
  public commentLabel = translations['testimonials.commentLabel']['es'];
  public commentError = translations['testimonials.commentError']['es'];
  public submitButton = translations['testimonials.submitButton']['es'];
  public cancelButton = translations['testimonials.cancelButton']['es'];
  public successMessage = translations['testimonials.successMessage']['es'];
  public ratingLabel = translations['testimonials.ratingLabel']['es'];
  public selectRating = translations['testimonials.selectRating']['es'];
  public namePlaceholder = translations['testimonials.namePlaceholder']['es'];
  public positionPlaceholder = translations['testimonials.positionPlaceholder']['es'];
  public companyPlaceholder = translations['testimonials.companyPlaceholder']['es'];
  public commentPlaceholder = translations['testimonials.commentPlaceholder']['es'];

  constructor(
    private testimonialModalService: TestimonialModalService,
    private fb: FormBuilder,
    private languageService: LanguageService,
    private http: HttpClient
  ) {
    this.testimonialForm = this.fb.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      company: ['', [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadTranslations();
    
    this.subscription = this.testimonialModalService.showModal$.subscribe(
      (show: boolean) => {
        this.showModal = show;
      }
    );

    this.languageSubscription.add(
      this.languageService.currentLanguage$.pipe(
        skip(1)
      ).subscribe(() => {
        this.loadTranslations();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

  private loadTranslations(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.formTitle = translations['testimonials.formTitle'][currentLang] as string;
    this.formSubtitle = translations['testimonials.formSubtitle'][currentLang] as string;
    this.nameLabel = translations['testimonials.nameLabel'][currentLang] as string;
    this.nameError = translations['testimonials.nameError'][currentLang] as string;
    this.positionLabel = translations['testimonials.positionLabel'][currentLang] as string;
    this.positionError = translations['testimonials.positionError'][currentLang] as string;
    this.companyLabel = translations['testimonials.companyLabel'][currentLang] as string;
    this.companyError = translations['testimonials.companyError'][currentLang] as string;
    this.commentLabel = translations['testimonials.commentLabel'][currentLang] as string;
    this.commentError = translations['testimonials.commentError'][currentLang] as string;
    this.submitButton = translations['testimonials.submitButton'][currentLang] as string;
    this.cancelButton = translations['testimonials.cancelButton'][currentLang] as string;
    this.successMessage = translations['testimonials.successMessage'][currentLang] as string;
    this.ratingLabel = translations['testimonials.ratingLabel'][currentLang] as string;
    this.selectRating = translations['testimonials.selectRating'][currentLang] as string;
    this.namePlaceholder = translations['testimonials.namePlaceholder'][currentLang] as string;
    this.positionPlaceholder = translations['testimonials.positionPlaceholder'][currentLang] as string;
    this.companyPlaceholder = translations['testimonials.companyPlaceholder'][currentLang] as string;
    this.commentPlaceholder = translations['testimonials.commentPlaceholder'][currentLang] as string;
  }

  closeModal(): void {
    this.testimonialModalService.closeModal();
    this.testimonialForm.reset();
    this.selectedRating = 0;
  }

  setRating(rating: number): void {
    this.selectedRating = rating;
  }

  getRatingText(rating: number): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const ratingTexts: { [key: number]: string } = {
      1: translations['testimonials.ratingText1'][currentLang] as string,
      2: translations['testimonials.ratingText2'][currentLang] as string,
      3: translations['testimonials.ratingText3'][currentLang] as string,
      4: translations['testimonials.ratingText4'][currentLang] as string,
      5: translations['testimonials.ratingText5'][currentLang] as string
    };
    return ratingTexts[rating] || '';
  }

  submitTestimonial(): void {
    if (this.testimonialForm.valid && this.selectedRating > 0) {
      const newTestimonial = {
        name: this.testimonialForm.value.name,
        position: this.testimonialForm.value.position,
        company: this.testimonialForm.value.company,
        comment: this.testimonialForm.value.comment,
        rating: this.selectedRating,
        date: new Date().toISOString().split('T')[0]
      };

      // Emitir el evento a través del servicio
      this.testimonialModalService.addTestimonial(newTestimonial);
      
      this.closeModal();
    }
  }
}
