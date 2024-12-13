import { environment } from './../../../../environments/environment';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, {EmailJSResponseStatus} from 'emailjs-com';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfoComponent {

 public emailForm: FormGroup
public serviceId =  environment.emailJsSeviceId;
public templateId = environment.emailJsTemplateId;
public key = environment.publicApikey;

 constructor(private formBuilder : FormBuilder
 ){
  this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      subject: ['', [Validators.required, Validators.minLength(20)]],
      message: [ '', [Validators.required, Validators.minLength(50)]],
  });
 }

 onSubmit(){
  if(this.emailForm.valid){
    const formData = this.emailForm.value;
    this.sendEmail(formData);
  }else{
    console.log('el formulario no es valido');
    this.emailForm.markAsTouched();
  }
 }

 sendEmail(formData: any){
  emailjs.send(
    this.serviceId,
    this.templateId, 
    {
      from_name : formData.email,
      subject : formData.subject,
      message : formData.message
    },
    this.key
  ).then(
    (result: EmailJSResponseStatus) => {
      Swal.fire('Mensaje Enviado correctamente', 'El mensaje se ha enviado a Rafael', 'success');
      this.emailForm.reset();
      document.getElementById('email')?.focus(); 
    },
    (error) => {
      Swal.fire('Ocurrio un error al mandar el mensaje', 'Intente nuevamente', 'error');
    }
  )
 }
}
