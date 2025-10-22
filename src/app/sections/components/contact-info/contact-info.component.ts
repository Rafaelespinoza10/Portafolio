import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfoComponent {

 public emailForm: FormGroup
 // Formspree endpoint desde environment
 private formspreeEndpoint = environment.formspreeEndpoint;

 constructor(
   private formBuilder : FormBuilder,
   private http: HttpClient
 ){
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: [ '', [Validators.required]],
  });
 }

 onSubmit(){
  if(this.emailForm.valid){
    const formData = this.emailForm.value;
    this.sendEmail(formData);
  }else{
    this.emailForm.markAsTouched();
  }
 }

 sendEmail(formData: any){
  // Mostrar loading
  Swal.fire({
    title: 'Enviando mensaje...',
    text: 'Por favor espera',
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // Enviar con Formspree
  const formDataToSend = {
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
    _replyto: formData.email,
    _subject: `Portfolio Contact: ${formData.subject}`
  };

  this.http.post(this.formspreeEndpoint, formDataToSend).subscribe({
    next: (response) => {
      Swal.close();
      Swal.fire({
        title: '¡Mensaje enviado!',
        text: 'Te responderé lo antes posible',
        icon: 'success',
        confirmButtonText: 'Perfecto',
        footer: '<small>Si no recibes respuesta en 24h, contacta directamente a rafael.moreno.espinoza10@gmail.com</small>'
      });
      this.emailForm.reset();
      document.getElementById('email')?.focus();
    },
    error: (error) => {
      Swal.close();
      console.error('Formspree Error:', error);
      
      Swal.fire({
        title: 'Error al enviar mensaje',
        text: 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente o contacta directamente.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        footer: '<a href="mailto:rafael.moreno.espinoza10@gmail.com" style="color: #8b5cf6; text-decoration: underline;">📧 Enviar email directamente</a>'
      });
    }
  });
 }
}
