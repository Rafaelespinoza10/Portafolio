import { Component } from '@angular/core';

@Component({
  selector: 'component-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent {

  // Proyectos de experiencia laboral
  // Proyectos de experiencia laboral
projectsWorkExperience = [
  {
    name: 'Monitoreo de sensores en tiempo real',
    imageSrc: 'images/monitoreo_sensores.png',
    description: 'Monitoreo de sensores en tiempo real con Angular, .NET 6, SignalR y MSSQL.',
    technologies: [
      'https://www.svgrepo.com/show/452156/angular.svg', // Angular
      'https://www.svgrepo.com/show/376369/dotnet.svg', // .NET
      'https://boost.space/wp-content/uploads/2025/02/mssql.png', // MSSQL
    ]
  },
  {
    name: 'Registros de parámetros de ECOAT',
    imageSrc: 'images/ecoat_registros-parametros.png',
    description: 'Registro de parámetros ECOAT con Angular, .NET 6, MSSQL y gráficos interactivos.',
    technologies: [
      'https://www.svgrepo.com/show/452156/angular.svg', // Angular
      'https://www.svgrepo.com/show/376369/dotnet.svg', // .NET
      'https://boost.space/wp-content/uploads/2025/02/mssql.png', // MSSQL
    ]
  },
  {
    name: 'Monitoreo de Troqueles con conexión a SAP',
    imageSrc: 'images/troqueles_app.png',
    description: 'Monitoreo de órdenes de mantenimiento de troqueles con Angular, .NET 6, SAP y MSSQL.',
    technologies: [
      'https://www.svgrepo.com/show/452156/angular.svg', // Angular
      'https://www.svgrepo.com/show/376369/dotnet.svg', // .NET
      'https://boost.space/wp-content/uploads/2025/02/mssql.png', // MSSQL
    ]
  },
  {
    name: 'Reportes de Líneas de Ensamble',
    imageSrc: 'images/assembly-reports.png',
    description: 'Generación de reportes y OEE de líneas de ensamble con Angular, .NET y MSSQL.',
    technologies: [
      'https://www.svgrepo.com/show/452156/angular.svg', // Angular
      'https://www.svgrepo.com/show/376369/dotnet.svg', // .NET
      'https://boost.space/wp-content/uploads/2025/02/mssql.png', // MSSQL
    ]
  },
  {
    name: 'Registro de Tiempo Extra',
    imageSrc: 'images/extra_time.PNG',
    description: 'Gestión de horas extras con React, NodeJs, Express, Sequelize y MSSQL.',
    technologies: [
      'https://www.svgrepo.com/show/452092/react.svg', // React
      'https://www.svgrepo.com/show/452075/node-js.svg', // Node.js
      'https://www.svgrepo.com/show/303251/mysql-logo.svg', // MySQL
      'https://miro.medium.com/v2/resize:fit:1400/0*Pb_eiAEdkkDxsZr7.jpeg' // TypeORM
    ]
  },
  {
    name: 'Seguimiento y Control de Asistencias',
    imageSrc: 'images/peasa_desktop.png',
    description: 'Control de asistencias con .NET Forms y MSSQL.',
    technologies: [
      'https://www.svgrepo.com/show/303251/mysql-logo.svg', // MySQL
      'https://www.svgrepo.com/show/376369/dotnet.svg', // .NET
    ]
  },
];


  // Proyectos personales
  projectsPersonal = [
    {
      nameProject: 'POS - Ecommerce',
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1750573104/fmsntvp41czuotcg2n1a.png',
      description: 'Aplicación de tienda virtual y control de compras en un solo lugar, realizada en NextJs, NestJs, TypeOrm, PostgresSQL.',
      linkSitioWeb: 'https://pos-nextjs-8fuoxt1di-rafael-morenos-projects-c25eb243.vercel.app/19',
      technologies: [
        'https://www.svgrepo.com/show/452092/react.svg',
        'https://img.icons8.com/fluent-systems-filled/512/FFFFFF/nextjs.png',
        'https://www.logo.wine/a/logo/PostgreSQL/PostgreSQL-Logo.wine.svg',
        'https://logowik.com/content/uploads/images/typeorm-icon1721419127.logowik.com.webp'
      ],
      resources: [
        {
          text: 'Repositorio en GitHub:',
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: ''
        },
        {
          text: 'Proyecto en funcionamiento',
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://www.linkedin.com/feed/update/urn:li:activity:7342429483892699136/'
        }
      ]
    },
    {
      nameProject: 'DevTree',
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1742446234/devTree/naymaymv2lsevrvghltf.png',
      description: 'Aplicación de todas tus redes sociales en un solo link y que podrás compartir con tus amigos y cercanos. Realizada con Nextjs, Nodejs y express, prisma, postgresSql y jwt.',
      linkSitioWeb: 'https://devtree-application.netlify.app/',
      technologies: [
        'https://www.svgrepo.com/show/452092/react.svg',
        'https://img.icons8.com/fluent-systems-filled/512/FFFFFF/nextjs.png',
        'https://www.logo.wine/a/logo/PostgreSQL/PostgreSQL-Logo.wine.svg',
        'https://www.svgrepo.com/show/452075/node-js.svg',
        'https://yt3.googleusercontent.com/p0e4rdG4CShBUYRHII3DJKdMI8s7jlleXy5pPV4RmmFUWsBhzqzBemn1kkpGWn-Z8undVA9r=s900-c-k-c0x00ffffff-no-rj'
      ],
      resources: [
        {
          text: 'Repositorio en GitHub:',
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: ''
        },
        {
          text: 'Proyecto en funcionamiento',
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://www.linkedin.com/feed/update/urn:li:activity:7292038677868793856/?originTrackingId=YwQKXU9zSoWiiWN7j6xsgg%3D%3D'
        }
      ]
    },
    {
      nameProject: 'CashTrackr',
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1742447486/devTree/izhvtslhhpq4td1azpqs.png',
      description: 'Aplicación de control de gastos y presupuestos en un solo lugar, realizada en NextJs, Nodejs con express, Prisma, JWT, PostgresSQL.',
      linkSitioWeb: 'https://cashtrackr-frontend-nine.vercel.app/',
      technologies: [
        'https://www.svgrepo.com/show/452092/react.svg',
        'https://img.icons8.com/fluent-systems-filled/512/FFFFFF/nextjs.png',
        'https://www.logo.wine/a/logo/PostgreSQL/PostgreSQL-Logo.wine.svg',
        'https://www.svgrepo.com/show/452075/node-js.svg',
        'https://yt3.googleusercontent.com/p0e4rdG4CShBUYRHII3DJKdMI8s7jlleXy5pPV4RmmFUWsBhzqzBemn1kkpGWn-Z8undVA9r=s900-c-k-c0x00ffffff-no-rj'
      ],
      resources: [
        {
          text: 'Repositorio en GitHub:',
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: ''
        },
        {
          text: 'Proyecto en funcionamiento',
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://www.linkedin.com/feed/update/urn:li:activity:7307625271057133568/?originTrackingId=okhdNhUPTIOuV%2FnQ1Ny3yQ%3D%3D'
        }
      ]
    },
    {
      nameProject: 'SongsApp',
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734049198/lvpama84ikdbfzyumhop.png',
      description: 'Aplicación de canciones realizada con Angular, .NET, MySQL, MaterialAngular, TailwindCSS, y uso de API de terceros (API Youtube v3), JWT.',
      linkSitioWeb: 'https://songsapplications.netlify.app/',
      technologies: [
        'https://www.svgrepo.com/show/452156/angular.svg',
        'https://www.svgrepo.com/show/374118/tailwind.svg',
        'https://www.svgrepo.com/show/376369/dotnet.svg',
        'https://www.svgrepo.com/show/303251/mysql-logo.svg'
      ],
      resources: [
        {
          text: 'Repositorio en GitHub:',
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: ''
        },
        {
          text: 'Proyecto en funcionamiento',
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://www.linkedin.com/feed/update/urn:li:activity:7250287666108272640/?originTrackingId=LEjKpm79SUiH8bN8s6VWGQ%3D%3D'
        }
      ]
    },
    {
      nameProject: 'devJobsApp',
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734049198/fs0c5b8bbv3po4njlqyw.png',
      description: 'Aplicación de empleos para desarrolladores realizada en Angular, Node.js, Mongoose, Python, TailwindCSS, MongoDB, JWT.',
      linkSitioWeb: 'https://cozy-gumdrop-2aefec.netlify.app/',
      technologies: [
        'https://www.svgrepo.com/show/452156/angular.svg',
        'https://www.svgrepo.com/show/452075/node-js.svg',
        'https://www.svgrepo.com/show/331488/mongodb.svg',
        'https://www.svgrepo.com/show/374016/python.svg',
        'https://www.svgrepo.com/show/374118/tailwind.svg'
      ],
      resources: [
        {
          text: 'Repositorio en GitHub:',
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: ''
        },
        {
          text: 'Proyecto en funcionamiento',
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://www.linkedin.com/feed/update/urn:li:activity:7270976517499764736/?originTrackingId=OBIIuUC%2FRPu%2FRG77e0hxhQ%3D%3D'
        }
      ]
    },
    {
      nameProject: 'RealStateApp',
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734049198/zzmi4e0rf7hkvs7x1c0c.png',
      description: 'Aplicación de Bienes Raíces realizada con NodeJs, Template Pug, TailwindCSS, JWT, MySQL, Sequelize.',
      linkSitioWeb: 'https://bienesraices-node.onrender.com/',
      technologies: [
        'https://www.svgrepo.com/show/452075/node-js.svg',
        'https://www.svgrepo.com/show/374012/pug.svg',
        'https://www.svgrepo.com/show/374118/tailwind.svg',
        'https://www.svgrepo.com/show/303251/mysql-logo.svg'
      ],
      resources: [
        {
          text: 'Repositorio en GitHub:',
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: ''
        },
        {
          text: 'Proyecto en funcionamiento',
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://www.linkedin.com/feed/update/urn:li:activity:7224288482314125312/?originTrackingId=LFWy9Z0hT12Hh3yoDccT8w%3D%3D'
        }
      ]
    }
  ];
}
