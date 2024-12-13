import { Component } from '@angular/core';

@Component({
  selector: 'component-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.css'
})
export class PortafolioComponent {


  projects = [

    {
      nameProject: 'SongsApp',
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734049198/lvpama84ikdbfzyumhop.png',
      description: 'Aplicacion de Canciones realizada con Angular, .NET, MySQL, MaterialAngular, TailwindCSS, y uso de API de terceros (API Youtube v3), JWT',
      linkSitioWeb: 'https://songsapplications.netlify.app/',
      technologies: ['https://www.svgrepo.com/show/452156/angular.svg', 'https://www.svgrepo.com/show/374118/tailwind.svg', 'https://www.svgrepo.com/show/376369/dotnet.svg', 'https://www.svgrepo.com/show/303251/mysql-logo.svg' ],
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
      description: 'Aplicacion de Empleos para Desarrolladores realizada en Angular, Node.js, Mongoose, Python, TailwindCSS, MongoDB, JWT',
      linkSitioWeb: 'https://cozy-gumdrop-2aefec.netlify.app/',
      technologies: ['https://www.svgrepo.com/show/452156/angular.svg', 'https://www.svgrepo.com/show/452075/node-js.svg', 'https://www.svgrepo.com/show/331488/mongodb.svg', 'https://www.svgrepo.com/show/374016/python.svg', 'https://www.svgrepo.com/show/374118/tailwind.svg' ],
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
      description: 'Aplicacion de Bienes Raices realizada con NodeJs, Template Pug, TailwindCSS, JWT, MySQL, Sequelize',
      linkSitioWeb: 'https://bienesraices-node.onrender.com/',
      technologies: ['https://www.svgrepo.com/show/452075/node-js.svg', 'https://www.svgrepo.com/show/374012/pug.svg', 'https://www.svgrepo.com/show/374118/tailwind.svg', 'https://www.svgrepo.com/show/303251/mysql-logo.svg'],
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
    },
    {
      nameProject: 'JournalApp',
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1731386909/yss6vricssd2wwzcjnfc.png',
      description: 'Aplicacion de Notas realizada con React, FireBase, Cloudinary, Material UI',
      linkSitioWeb: 'https://journal-app-six-pi.vercel.app/auth/login',
      technologies: ['https://www.svgrepo.com/show/452092/react.svg','https://www.svgrepo.com/show/373595/firebase.svg', 'https://www.svgrepo.com/show/353566/cloudinary.svg', 'https://www.svgrepo.com/show/354048/material-ui.svg'],
    resources: [
        {
            text: 'Repositorio en GitHub:',
            github: 'https://www.svgrepo.com/show/512317/github-142.svg',
            linkRespository: ''
        },
        {

            text: 'Proyecto en funcionamiento',
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://www.linkedin.com/feed/update/urn:li:activity:7243411751860416512/?originTrackingId=ASUBOYL3QAi6j%2FtcGpN%2BBQ%3D%3D'
        }
    ]
    },
    {
      nameProject:'My Portafolio',
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734072917/journal/uqbcy3vx1lgbkgld9rny.png',
      description: 'Mi portafolio, uno de los proyectos mas importantes que he realizado, en este espacio comparto las experiencias que van mas alla del desarrollador y seguire con ese empeño y dedicacion',
      technologies : ['https://www.svgrepo.com/show/452156/angular.svg', 'https://www.svgrepo.com/show/374118/tailwind.svg', 'https://www.svgrepo.com/show/353566/cloudinary.svg'],
      resources: [
        {
            text: 'Repositorio en GitHub:',
            github: 'https://www.svgrepo.com/show/512317/github-142.svg',
            linkRespository: ''
        },
        {

            text: 'Proyecto en funcionamiento',
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: ''
        }
    ]
    },
  ]
}
