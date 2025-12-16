import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { translations } from '../../../i18n/translations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfoComponent implements OnInit, OnDestroy {
  public emailForm: FormGroup;
  private formspreeEndpoint = environment.formspreeEndpoint;
  private languageSubscription: Subscription = new Subscription();

  // Translated properties
  public title = translations['contactForm.title']['es'];
  public subtitle = translations['contactForm.subtitle']['es'];
  public emailLabel = translations['contactForm.emailLabel']['es'];
  public emailPlaceholder = translations['contactForm.emailPlaceholder']['es'];
  public emailError = translations['contactForm.emailError']['es'];
  public subjectLabel = translations['contactForm.subjectLabel']['es'];
  public subjectPlaceholder = translations['contactForm.subjectPlaceholder']['es'];
  public subjectError = translations['contactForm.subjectError']['es'];
  public messageLabel = translations['contactForm.messageLabel']['es'];
  public messagePlaceholder = translations['contactForm.messagePlaceholder']['es'];
  public messageError = translations['contactForm.messageError']['es'];
  public sendButton = translations['contactForm.sendButton']['es'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private languageService: LanguageService
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadTranslations();
    
    this.languageSubscription.add(
      this.languageService.currentLanguage$.pipe(
        skip(1)
      ).subscribe(() => {
        this.loadTranslations();
      })
    );
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  private loadTranslations(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.title = translations['contactForm.title'][currentLang] as string;
    this.subtitle = translations['contactForm.subtitle'][currentLang] as string;
    this.emailLabel = translations['contactForm.emailLabel'][currentLang] as string;
    this.emailPlaceholder = translations['contactForm.emailPlaceholder'][currentLang] as string;
    this.emailError = translations['contactForm.emailError'][currentLang] as string;
    this.subjectLabel = translations['contactForm.subjectLabel'][currentLang] as string;
    this.subjectPlaceholder = translations['contactForm.subjectPlaceholder'][currentLang] as string;
    this.subjectError = translations['contactForm.subjectError'][currentLang] as string;
    this.messageLabel = translations['contactForm.messageLabel'][currentLang] as string;
    this.messagePlaceholder = translations['contactForm.messagePlaceholder'][currentLang] as string;
    this.messageError = translations['contactForm.messageError'][currentLang] as string;
    this.sendButton = translations['contactForm.sendButton'][currentLang] as string;
  }

  onSubmit() {
    if (this.emailForm.valid) {
      const formData = this.emailForm.value;
      this.sendEmail(formData);
    } else {
      this.emailForm.markAllAsTouched();
    }
  }

  sendEmail(formData: any) {
    const currentLang = this.languageService.getCurrentLanguage();
    
    Swal.fire({
      title: translations['contactForm.sending'][currentLang] as string,
      text: translations['contactForm.sendingText'][currentLang] as string,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const formDataToSend = {
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      _replyto: formData.email,
      _subject: `Portfolio Contact: ${formData.subject}`
    };

    this.http.post(this.formspreeEndpoint, formDataToSend).subscribe({
      next: (response: any) => {
        Swal.close();
        Swal.fire({
          title: translations['contactForm.successTitle'][currentLang] as string,
          text: translations['contactForm.successText'][currentLang] as string,
          icon: 'success',
          confirmButtonText: translations['contactForm.successButton'][currentLang] as string,
          footer: `<small>${translations['contactForm.successFooter'][currentLang] as string}</small>`
        });
        this.emailForm.reset();
        document.getElementById('email')?.focus();
      },
      error: (error: any) => {
        Swal.close();
        console.error('Formspree Error:', error);
        
        Swal.fire({
          title: translations['contactForm.errorTitle'][currentLang] as string,
          text: translations['contactForm.errorText'][currentLang] as string,
          icon: 'error',
          confirmButtonText: translations['contactForm.errorButton'][currentLang] as string,
          footer: `<a href="mailto:rafael.moreno.espinoza10@gmail.com" style="color: #8b5cf6; text-decoration: underline;">${translations['contactForm.errorFooter'][currentLang] as string}</a>`
        });
      }
    });
  }
}
