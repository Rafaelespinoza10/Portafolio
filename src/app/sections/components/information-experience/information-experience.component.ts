import { Component } from '@angular/core';

@Component({
  selector: 'component-information-experience',
  templateUrl: './information-experience.component.html',
  styleUrl: './information-experience.component.css'
})
export class InformationExperienceComponent {
  experiences = [

    {
      companyName: 'BoletoMóvil',
      logoSrc:'https://play-lh.googleusercontent.com/MsrwSJKoY6Xp9CThBeNKn7dvTwbvBbTpcjxKOp5A-Q5VpgT0NA4zvktTngy2dX8m8mk',
      jobTitle: 'Full Stack Developer',
      description: [
        'Mantenimiento y creacion de nuevas funcionalidades en React y NodeJs',
        'Manejo de AWS'
      ],
      duration: 'Jul 2025 - Actual'
    },
    {
      companyName: 'Cosma Magna S.L.P.',
      logoSrc: 'https://pbs.twimg.com/media/EwN7tXlWUAINJ3z.jpg',
      jobTitle: 'Desarrollador de Software Industria 4.0',
      description: [
        'Desarrollo de APIs REST con ASP.NET y Entity Framework Core 6.',
        'Creación de Aplicaciones Web con Angular, TailwindCSS y .NET.',
        'Gestión de bases de datos SQL Server e InfluxDB.',
        'Desarrollo de plugins en Grafana con React.'
      ],
      duration: 'Sep 2024 - Jul 2025'
    },
    {
      companyName: 'PEASA',
      logoSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5YSaKJMrF2wUapDC2kv73AxiScL5HKMKT2w&s',
      jobTitle: 'Desarrollador de Aplicaciones en Mejora Continua',
      description: [
        'Automatización de procesos en Recursos Humanos.',
        'Desarrollo de aplicaciones web con JavaScript, React, TailwindCSS, Node.js.',
        'Creación de app de control de personal con .NET 6.',
        'Análisis de datos con Python y Excel.'
      ],
      duration: 'Ene 2024 - Jul 2024'
    },
    {
      companyName: 'Laboratorio de Ingeniería de Control, UASLP',
      logoSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQli_bQUEepcIMxQNF5UGbF_JxMcUAxeY7wQ&s',
      jobTitle: 'Becario de Ingeniería de Control',
      description: [
        'Impartí clases y simulaciones de sistemas de control.',
        'Programación en Scilab, Octave y Matlab para análisis de sistemas.',
        'Uso de Simulink y librerías para visualización y simulación.'
      ],
      duration: 'Ene 2023 - May 2024'
    }
  ];
}
