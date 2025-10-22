import { Component } from '@angular/core';

@Component({
  selector: 'component-education-courses',
  templateUrl: './education-courses.component.html',
  styleUrl: './education-courses.component.css'
})
export class EducationCoursesComponent {

  courses = [
    {
      title: 'Machine Learning y Data Science: Curso Completo con Python',
      description: 'Domina las técnicas de Machine Learning y Data Science con Python, incluyendo algoritmos de clasificación, regresión, clustering y visualización de datos',
      image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1761113075/w6q7ltavgebzle4xram0.png',
      certificateUrl: 'https://www.udemy.com/certificate/UC-8ebf2992-3f66-45aa-9d96-4c66af9f650b/'
    },
    {
      title: 'Angular Pro',
      description: 'Aprende las nuevas funcionalidades de Angular 19, SSR, Zoneless, uso de señales y nueva inyección de dependencias',
      image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1750575172/jln0weajaaeyloxtjsvx.png',
      certificateUrl: 'https://cursos.devtalles.com/certificates/6gqnay1wic'
    },
    {
      title: 'Full Stack: Node.js, React, NestJs, NextJs',
      description: 'Aprende y realiza proyectos con las tecnologias mas demandas del mercado e incorporación de NextJs',
      image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1750575066/aap5aswqwimg6ti2biph.png',
      certificateUrl: 'https://www.udemy.com/certificate/UC-f991e756-1bea-48fb-8a16-5dda4dc14c0f/'
    },
    {
      title: 'Angular: De Cero A Experto',
      description: 'Aprende las bases de Angular y lleva tus habilidades más allá.',
      image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734128759/journal/ltdsilgrz2naondxkzrw.png',
      certificateUrl: 'https://cursos.devtalles.com/certificates/klo8xvp4su'
    },
    {
      title: 'React: De Cero A Experto',
      description: 'Aprende las bases de React y desarrolla proyectos Frontend.',
      image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-9f13aae9-d81b-4474-a2ce-29c83dcf0074.jpg?v=1731379207000',
      certificateUrl: 'https://www.udemy.com/certificate/UC-9f13aae9-d81b-4474-a2ce-29c83dcf0074/m'
    },
    {
      title: 'JavaScript Moderno: Guía Definitiva',
      description: 'Aprende las bases del desarrollo web con JavaScript, HTML5 y CSS3.',
      image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-9e2da906-389f-465b-846a-8369f93c948c.jpg?v=1726119879000',
      certificateUrl: 'https://www.udemy.com/certificate/UC-9e2da906-389f-465b-846a-8369f93c948c/'
    },
    {
      title: 'Foundational C# With Microsoft',
      description: 'Aprende los fundamentos del lenguaje potenciado por Microsoft.',
      image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734058524/journal/tyiqaww6h8biuqvdmhes.png',
      certificateUrl: 'https://www.freecodecamp.org/certification/fcc1a16f5db-feb8-42e2-87cf-2ecaaf3b8e97/foundational-c-sharp-with-microsoft'
    },
    {
      title: 'Programación de Robótica Industrial: FANUC Core Training',
      description: 'Aprende a programar robots de la industria como un profesional.',
      image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-dd5649b8-a7d5-4600-bbb8-111cb981369e.jpg?v=1711323513000',
      certificateUrl: 'https://www.udemy.com/certificate/UC-dd5649b8-a7d5-4600-bbb8-111cb981369e/'
    },
    {
      title: 'Getting Started With Deep Learning',
      description: 'Aprende las bases del aprendizaje profundo con Keras y Python.',
      image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734058763/journal/hyrhcm3wjvnsv7nm29op.png',
      certificateUrl: 'https://learn.nvidia.com/certificates?id=fb3ca4fa6ebb4284a1f1a68d8992f6d8'
    }
  ];
  
}
