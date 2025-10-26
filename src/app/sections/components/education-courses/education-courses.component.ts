import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';

@Component({
  selector: 'component-education-courses',
  templateUrl: './education-courses.component.html',
  styleUrl: './education-courses.component.css'
})
export class EducationCoursesComponent implements OnInit, OnDestroy {
  private languageSubscription: Subscription = new Subscription();
  
  courses: any[] = [];
  title = translations['education.title']['es'];
  university = translations['education.university']['es'];
  faculty = translations['education.faculty']['es'];
  career = translations['education.career']['es'];
  description = translations['education.description']['es'];
  duration = 'Sep 2019 - Actual';
  viewCertificateText = translations['course.viewCertificate']['es'];

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
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
    const currentText = translations['education.duration.current'][currentLang];
    
    this.title = translations['education.title'][currentLang];
    this.university = translations['education.university'][currentLang];
    this.faculty = translations['education.faculty'][currentLang];
    this.career = translations['education.career'][currentLang];
    this.description = translations['education.description'][currentLang];
    this.duration = `Sep 2019 - ${currentText}`;
    this.viewCertificateText = translations['course.viewCertificate'][currentLang];
    
    this.courses = [
      {
        title: translations['course.ml.title'][currentLang],
        description: translations['course.ml.description'][currentLang],
        image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1761113075/w6q7ltavgebzle4xram0.png',
        certificateUrl: 'https://www.udemy.com/certificate/UC-8ebf2992-3f66-45aa-9d96-4c66af9f650b/'
      },
      {
        title: translations['course.angularPro.title'][currentLang],
        description: translations['course.angularPro.description'][currentLang],
        image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1750575172/jln0weajaaeyloxtjsvx.png',
        certificateUrl: 'https://cursos.devtalles.com/certificates/6gqnay1wic'
      },
      {
        title: translations['course.fullstack.title'][currentLang],
        description: translations['course.fullstack.description'][currentLang],
        image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1750575066/aap5aswqwimg6ti2biph.png',
        certificateUrl: 'https://www.udemy.com/certificate/UC-f991e756-1bea-48fb-8a16-5dda4dc14c0f/'
      },
      {
        title: translations['course.angular.title'][currentLang],
        description: translations['course.angular.description'][currentLang],
        image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734128759/journal/ltdsilgrz2naondxkzrw.png',
        certificateUrl: 'https://cursos.devtalles.com/certificates/klo8xvp4su'
      },
      {
        title: translations['course.react.title'][currentLang],
        description: translations['course.react.description'][currentLang],
        image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-9f13aae9-d81b-4474-a2ce-29c83dcf0074.jpg?v=1731379207000',
        certificateUrl: 'https://www.udemy.com/certificate/UC-9f13aae9-d81b-4474-a2ce-29c83dcf0074/m'
      },
      {
        title: translations['course.javascript.title'][currentLang],
        description: translations['course.javascript.description'][currentLang],
        image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-9e2da906-389f-465b-846a-8369f93c948c.jpg?v=1726119879000',
        certificateUrl: 'https://www.udemy.com/certificate/UC-9e2da906-389f-465b-846a-8369f93c948c/'
      },
      {
        title: translations['course.csharp.title'][currentLang],
        description: translations['course.csharp.description'][currentLang],
        image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734058524/journal/tyiqaww6h8biuqvdmhes.png',
        certificateUrl: 'https://www.freecodecamp.org/certification/fcc1a16f5db-feb8-42e2-87cf-2ecaaf3b8e97/foundational-c-sharp-with-microsoft'
      },
      {
        title: translations['course.fanuc.title'][currentLang],
        description: translations['course.fanuc.description'][currentLang],
        image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-dd5649b8-a7d5-4600-bbb8-111cb981369e.jpg?v=1711323513000',
        certificateUrl: 'https://www.udemy.com/certificate/UC-dd5649b8-a7d5-4600-bbb8-111cb981369e/'
      },
      {
        title: translations['course.deeplearning.title'][currentLang],
        description: translations['course.deeplearning.description'][currentLang],
        image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734058763/journal/hyrhcm3wjvnsv7nm29op.png',
        certificateUrl: 'https://learn.nvidia.com/certificates?id=fb3ca4fa6ebb4284a1f1a68d8992f6d8'
      }
    ];
  }
}
