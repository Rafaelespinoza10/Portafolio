import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LanguageService } from '../../../services/language.service';
import { translations } from '../../../i18n/translations';
import { ProjectModalService, WorkProject } from '../../services/project-modal.service';

@Component({
  selector: 'component-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit, OnDestroy {
  private languageSubscription: Subscription = new Subscription();
  public workExperienceTitle = translations['portfolio.workExperience.title']['es'];
  public personalProjectsTitle = translations['portfolio.personal.title']['es'];
  public viewDetailsText = translations['portfolio.viewDetails']['es'];
  public visitText = translations['portfolio.visit']['es'];
  public viewProjectText = translations['portfolio.viewProject']['es'];
  public videoText = translations['portfolio.video']['es'];
  
  constructor(
    private projectModalService: ProjectModalService,
    private languageService: LanguageService
  ) { }

  // Helper function to safely get string translations
  private getStringTranslation(key: string, lang: string): string {
    const value = translations[key][lang];
    return typeof value === 'string' ? value : (value as string[]).join(', ');
  }

  /**
   * Abre el modal con el proyecto seleccionado
   */
  openModal(project: WorkProject) {
    this.projectModalService.openModal(project);
  }

  /**
   * Maneja el efecto 3D al mover el mouse sobre una tarjeta
   */
  onMouseMove(event: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  /**
   * Resetea el efecto 3D cuando el mouse sale de la tarjeta
   */
  onMouseLeave(card: HTMLElement) {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }

  // Proyectos de experiencia laboral
  projectsWorkExperience: WorkProject[] = [
    {
      name: translations['portfolio.workProjects.sensors.name']['es'] as string,
      imageSrc: 'images/monitoreo_sensores.png',
      description: translations['portfolio.workProjects.sensors.description']['es'] as string,
      technologies: [
        'https://www.svgrepo.com/show/452156/angular.svg', // Angular
        'https://www.svgrepo.com/show/376369/dotnet.svg', // .NET
        'https://boost.space/wp-content/uploads/2025/02/mssql.png', // MSSQL
      ],
      detailedDescription: translations['portfolio.workProjects.sensors.detailedDescription']['es'] as string,
      features: translations['portfolio.workProjects.sensors.features']['es'] as string[],
      challenges: translations['portfolio.workProjects.sensors.challenges']['es'] as string[],
      impact: translations['portfolio.workProjects.sensors.impact']['es'] as string
    },
    {
      name: translations['portfolio.workProjects.ecoat.name']['es'] as string,
      imageSrc: 'images/ecoat_registros-parametros.png',
      description: translations['portfolio.workProjects.ecoat.description']['es'] as string,
      technologies: [
        'https://www.svgrepo.com/show/452156/angular.svg', // Angular
        'https://www.svgrepo.com/show/376369/dotnet.svg', // .NET
        'https://boost.space/wp-content/uploads/2025/02/mssql.png', // MSSQL
      ],
      detailedDescription: translations['portfolio.workProjects.ecoat.detailedDescription']['es'] as string,
      features: translations['portfolio.workProjects.ecoat.features']['es'] as string[],
      challenges: translations['portfolio.workProjects.ecoat.challenges']['es'] as string[],
      impact: translations['portfolio.workProjects.ecoat.impact']['es'] as string
    },
    {
      name: translations['portfolio.workProjects.dies.name']['es'] as string,
      imageSrc: 'images/troqueles_app.png',
      description: translations['portfolio.workProjects.dies.description']['es'] as string,
      technologies: [
        'https://www.svgrepo.com/show/452156/angular.svg', // Angular
        'https://www.svgrepo.com/show/376369/dotnet.svg', // .NET
        'https://boost.space/wp-content/uploads/2025/02/mssql.png', // MSSQL
      ],
      detailedDescription: translations['portfolio.workProjects.dies.detailedDescription']['es'] as string,
      features: translations['portfolio.workProjects.dies.features']['es'] as string[],
      challenges: translations['portfolio.workProjects.dies.challenges']['es'] as string[],
      impact: translations['portfolio.workProjects.dies.impact']['es'] as string
    },
    {
      name: translations['portfolio.workProjects.assembly.name']['es'] as string,
      imageSrc: 'images/assembly-reports.png',
      description: translations['portfolio.workProjects.assembly.description']['es'] as string,
      technologies: [
        'https://www.svgrepo.com/show/452156/angular.svg', // Angular
        'https://www.svgrepo.com/show/376369/dotnet.svg', // .NET
        'https://boost.space/wp-content/uploads/2025/02/mssql.png', // MSSQL
      ],
      detailedDescription: translations['portfolio.workProjects.assembly.detailedDescription']['es'] as string,
      features: translations['portfolio.workProjects.assembly.features']['es'] as string[],
      challenges: translations['portfolio.workProjects.assembly.challenges']['es'] as string[],
      impact: translations['portfolio.workProjects.assembly.impact']['es'] as string
    },
    {
      name: translations['portfolio.workProjects.overtime.name']['es'] as string,
      imageSrc: 'images/extra_time.PNG',
      description: translations['portfolio.workProjects.overtime.description']['es'] as string,
      technologies: [
        'https://www.svgrepo.com/show/452092/react.svg', // React
        'https://www.svgrepo.com/show/452075/node-js.svg', // Node.js
        'https://www.svgrepo.com/show/303251/mysql-logo.svg', // MySQL
        'https://miro.medium.com/v2/resize:fit:1400/0*Pb_eiAEdkkDxsZr7.jpeg' // TypeORM
      ],
      detailedDescription: translations['portfolio.workProjects.overtime.detailedDescription']['es'] as string,
      features: translations['portfolio.workProjects.overtime.features']['es'] as string[],
      challenges: translations['portfolio.workProjects.overtime.challenges']['es'] as string[],
      impact: translations['portfolio.workProjects.overtime.impact']['es'] as string
    },
    {
      name: translations['portfolio.workProjects.attendance.name']['es'] as string,
      imageSrc: 'images/peasa_desktop.png',
      description: translations['portfolio.workProjects.attendance.description']['es'] as string,
      technologies: [
        'https://www.svgrepo.com/show/303251/mysql-logo.svg', // MySQL
        'https://www.svgrepo.com/show/376369/dotnet.svg', // .NET
      ],
      detailedDescription: translations['portfolio.workProjects.attendance.detailedDescription']['es'] as string,
      features: translations['portfolio.workProjects.attendance.features']['es'] as string[],
      challenges: translations['portfolio.workProjects.attendance.challenges']['es'] as string[],
      impact: translations['portfolio.workProjects.attendance.impact']['es'] as string
    }
  ];

  // Proyectos personales
  projectsPersonal = [
    {
      nameProject: translations['portfolio.personalProjects.registergains.name']['es'],
      imageSrc: 'images/gym_app.png',
      description: translations['portfolio.personalProjects.registergains.description']['es'],
      linkSitioWeb: 'https://fitsgains.com/auth/login',
      technologies: [
        'https://www.svgrepo.com/show/452092/react.svg',
        'https://nestjs.com/img/logo-small.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        'https://www.svgrepo.com/show/331488/mongodb.svg'
      ],
      resources: [
        {
          text: translations['portfolio.resources.github']['es'],
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: ''
        },
        {
          text: translations['portfolio.resources.workingProject']['es'],
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://fitsgains.com/auth/login'
        }
      ]
    },
    {
      nameProject: translations['portfolio.personalProjects.ml.name']['es'],
      imageSrc: 'images/machine_learning_project.png',
      description: translations['portfolio.personalProjects.ml.description']['es'],
      linkSitioWeb: 'https://github.com/Rafaelespinoza10/machine_learning_project_prediction_liga_mx',
      technologies: [
        'https://www.svgrepo.com/show/374016/python.svg',
        'https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg',
        'https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png',
        'https://pandas.pydata.org/docs/_static/pandas.svg'
      ],
      resources: [
        {
          text: translations['portfolio.resources.github']['es'],
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: 'https://github.com/Rafaelespinoza10/machine_learning_project_prediction_liga_mx'
        },
        {
          text: translations['portfolio.resources.notebook']['es'],
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://github.com/Rafaelespinoza10/machine_learning_project_prediction_liga_mx'
        }
      ]
    },
    {
      nameProject: translations['portfolio.personalProjects.pos.name']['es'],
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1750573104/fmsntvp41czuotcg2n1a.png',
      description: translations['portfolio.personalProjects.pos.description']['es'],
      linkSitioWeb: 'https://pos-nextjs-8fuoxt1di-rafael-morenos-projects-c25eb243.vercel.app/19',
      technologies: [
        'https://www.svgrepo.com/show/452092/react.svg',
        'https://img.icons8.com/fluent-systems-filled/512/FFFFFF/nextjs.png',
        'https://www.logo.wine/a/logo/PostgreSQL/PostgreSQL-Logo.wine.svg',
        'https://logowik.com/content/uploads/images/typeorm-icon1721419127.logowik.com.webp'
      ],
      resources: [
        {
          text: translations['portfolio.resources.github']['es'],
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: ''
        },
        {
          text: translations['portfolio.resources.workingProject']['es'],
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://www.linkedin.com/feed/update/urn:li:activity:7342429483892699136/'
        }
      ]
    },
    {
      nameProject: translations['portfolio.personalProjects.devtree.name']['es'],
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1742446234/devTree/naymaymv2lsevrvghltf.png',
      description: translations['portfolio.personalProjects.devtree.description']['es'],
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
          text: translations['portfolio.resources.github']['es'],
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: ''
        },
        {
          text: translations['portfolio.resources.workingProject']['es'],
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://www.linkedin.com/feed/update/urn:li:activity:7292038677868793856/?originTrackingId=YwQKXU9zSoWiiWN7j6xsgg%3D%3D'
        }
      ]
    },
    {
      nameProject: translations['portfolio.personalProjects.cashtrackr.name']['es'],
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1742447486/devTree/izhvtslhhpq4td1azpqs.png',
      description: translations['portfolio.personalProjects.cashtrackr.description']['es'],
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
          text: translations['portfolio.resources.github']['es'],
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: ''
        },
        {
          text: translations['portfolio.resources.workingProject']['es'],
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://www.linkedin.com/feed/update/urn:li:activity:7307625271057133568/?originTrackingId=okhdNhUPTIOuV%2FnQ1Ny3yQ%3D%3D'
        }
      ]
    },
    {
      nameProject: translations['portfolio.personalProjects.songs.name']['es'],
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734049198/lvpama84ikdbfzyumhop.png',
      description: translations['portfolio.personalProjects.songs.description']['es'],
      linkSitioWeb: 'https://songsapplications.netlify.app/',
      technologies: [
        'https://www.svgrepo.com/show/452156/angular.svg',
        'https://www.svgrepo.com/show/374118/tailwind.svg',
        'https://www.svgrepo.com/show/376369/dotnet.svg',
        'https://www.svgrepo.com/show/303251/mysql-logo.svg'
      ],
      resources: [
        {
          text: translations['portfolio.resources.github']['es'],
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: ''
        },
        {
          text: translations['portfolio.resources.workingProject']['es'],
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://www.linkedin.com/feed/update/urn:li:activity:7250287666108272640/?originTrackingId=LEjKpm79SUiH8bN8s6VWGQ%3D%3D'
        }
      ]
    },
    {
      nameProject: translations['portfolio.personalProjects.devjobs.name']['es'],
      imageSrc: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734049198/fs0c5b8bbv3po4njlqyw.png',
      description: translations['portfolio.personalProjects.devjobs.description']['es'],
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
          text: translations['portfolio.resources.github']['es'],
          github: 'https://www.svgrepo.com/show/512317/github-142.svg',
          linkRespository: ''
        },
        {
          text: translations['portfolio.resources.workingProject']['es'],
          video: 'https://www.svgrepo.com/show/530237/video.svg',
          linkVideo: 'https://www.linkedin.com/feed/update/urn:li:activity:7270976517499764736/?originTrackingId=OBIIuUC%2FRPu%2FRG77e0hxhQ%3D%3D'
        }
      ]
    },
   
  ];

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
    this.workExperienceTitle = translations['portfolio.workExperience.title'][currentLang];
    this.personalProjectsTitle = translations['portfolio.personal.title'][currentLang];
    this.viewDetailsText = translations['portfolio.viewDetails'][currentLang];
    this.visitText = translations['portfolio.visit'][currentLang];
    this.viewProjectText = translations['portfolio.viewProject'][currentLang];
    this.videoText = translations['portfolio.video'][currentLang];
    
    // Actualizar títulos y descripciones de proyectos de experiencia laboral
    this.updateWorkExperienceProjects(currentLang);
    
    // Actualizar títulos y descripciones de proyectos personales
    this.updatePersonalProjects(currentLang);
  }

  private updateWorkExperienceProjects(currentLang: string): void {
    // Proyecto 0: Sensors
    this.projectsWorkExperience[0].name = translations['portfolio.workProjects.sensors.name'][currentLang] as string;
    this.projectsWorkExperience[0].description = translations['portfolio.workProjects.sensors.description'][currentLang] as string;
    this.projectsWorkExperience[0].detailedDescription = translations['portfolio.workProjects.sensors.detailedDescription'][currentLang] as string;
    this.projectsWorkExperience[0].features = translations['portfolio.workProjects.sensors.features'][currentLang] as string[];
    this.projectsWorkExperience[0].challenges = translations['portfolio.workProjects.sensors.challenges'][currentLang] as string[];
    this.projectsWorkExperience[0].impact = translations['portfolio.workProjects.sensors.impact'][currentLang] as string;
    
    // Proyecto 1: ECOAT
    this.projectsWorkExperience[1].name = translations['portfolio.workProjects.ecoat.name'][currentLang] as string;
    this.projectsWorkExperience[1].description = translations['portfolio.workProjects.ecoat.description'][currentLang] as string;
    this.projectsWorkExperience[1].detailedDescription = translations['portfolio.workProjects.ecoat.detailedDescription'][currentLang] as string;
    this.projectsWorkExperience[1].features = translations['portfolio.workProjects.ecoat.features'][currentLang] as string[];
    this.projectsWorkExperience[1].challenges = translations['portfolio.workProjects.ecoat.challenges'][currentLang] as string[];
    this.projectsWorkExperience[1].impact = translations['portfolio.workProjects.ecoat.impact'][currentLang] as string;
    
    // Proyecto 2: Dies
    this.projectsWorkExperience[2].name = translations['portfolio.workProjects.dies.name'][currentLang] as string;
    this.projectsWorkExperience[2].description = translations['portfolio.workProjects.dies.description'][currentLang] as string;
    this.projectsWorkExperience[2].detailedDescription = translations['portfolio.workProjects.dies.detailedDescription'][currentLang] as string;
    this.projectsWorkExperience[2].features = translations['portfolio.workProjects.dies.features'][currentLang] as string[];
    this.projectsWorkExperience[2].challenges = translations['portfolio.workProjects.dies.challenges'][currentLang] as string[];
    this.projectsWorkExperience[2].impact = translations['portfolio.workProjects.dies.impact'][currentLang] as string;
    
    // Proyecto 3: Assembly
    this.projectsWorkExperience[3].name = translations['portfolio.workProjects.assembly.name'][currentLang] as string;
    this.projectsWorkExperience[3].description = translations['portfolio.workProjects.assembly.description'][currentLang] as string;
    this.projectsWorkExperience[3].detailedDescription = translations['portfolio.workProjects.assembly.detailedDescription'][currentLang] as string;
    this.projectsWorkExperience[3].features = translations['portfolio.workProjects.assembly.features'][currentLang] as string[];
    this.projectsWorkExperience[3].challenges = translations['portfolio.workProjects.assembly.challenges'][currentLang] as string[];
    this.projectsWorkExperience[3].impact = translations['portfolio.workProjects.assembly.impact'][currentLang] as string;
    
    // Proyecto 4: Overtime
    this.projectsWorkExperience[4].name = translations['portfolio.workProjects.overtime.name'][currentLang] as string;
    this.projectsWorkExperience[4].description = translations['portfolio.workProjects.overtime.description'][currentLang] as string;
    this.projectsWorkExperience[4].detailedDescription = translations['portfolio.workProjects.overtime.detailedDescription'][currentLang] as string;
    this.projectsWorkExperience[4].features = translations['portfolio.workProjects.overtime.features'][currentLang] as string[];
    this.projectsWorkExperience[4].challenges = translations['portfolio.workProjects.overtime.challenges'][currentLang] as string[];
    this.projectsWorkExperience[4].impact = translations['portfolio.workProjects.overtime.impact'][currentLang] as string;
    
    // Proyecto 5: Attendance
    this.projectsWorkExperience[5].name = translations['portfolio.workProjects.attendance.name'][currentLang] as string;
    this.projectsWorkExperience[5].description = translations['portfolio.workProjects.attendance.description'][currentLang] as string;
    this.projectsWorkExperience[5].detailedDescription = translations['portfolio.workProjects.attendance.detailedDescription'][currentLang] as string;
    this.projectsWorkExperience[5].features = translations['portfolio.workProjects.attendance.features'][currentLang] as string[];
    this.projectsWorkExperience[5].challenges = translations['portfolio.workProjects.attendance.challenges'][currentLang] as string[];
    this.projectsWorkExperience[5].impact = translations['portfolio.workProjects.attendance.impact'][currentLang] as string;
  }

  private updatePersonalProjects(currentLang: string): void {
    this.projectsPersonal[0].nameProject = translations['portfolio.personalProjects.registergains.name'][currentLang];
    this.projectsPersonal[0].description = translations['portfolio.personalProjects.registergains.description'][currentLang];
    
    this.projectsPersonal[1].nameProject = translations['portfolio.personalProjects.ml.name'][currentLang];
    this.projectsPersonal[1].description = translations['portfolio.personalProjects.ml.description'][currentLang];
    
    this.projectsPersonal[2].nameProject = translations['portfolio.personalProjects.pos.name'][currentLang];
    this.projectsPersonal[2].description = translations['portfolio.personalProjects.pos.description'][currentLang];
    
    this.projectsPersonal[3].nameProject = translations['portfolio.personalProjects.devtree.name'][currentLang];
    this.projectsPersonal[3].description = translations['portfolio.personalProjects.devtree.description'][currentLang];
    
    this.projectsPersonal[4].nameProject = translations['portfolio.personalProjects.cashtrackr.name'][currentLang];
    this.projectsPersonal[4].description = translations['portfolio.personalProjects.cashtrackr.description'][currentLang];
    
    this.projectsPersonal[5].nameProject = translations['portfolio.personalProjects.songs.name'][currentLang];
    this.projectsPersonal[5].description = translations['portfolio.personalProjects.songs.description'][currentLang];
    
    this.projectsPersonal[6].nameProject = translations['portfolio.personalProjects.devjobs.name'][currentLang];
    this.projectsPersonal[6].description = translations['portfolio.personalProjects.devjobs.description'][currentLang];
    
    // Actualizar textos de recursos
    this.updatePersonalProjectsResources(currentLang);
  }

  private updatePersonalProjectsResources(currentLang: string): void {
    this.projectsPersonal.forEach(project => {
      project.resources.forEach(resource => {
        if (resource.text === 'Repositorio en GitHub:') {
          resource.text = translations['portfolio.resources.github'][currentLang];
        } else if (resource.text === 'Ver Notebook') {
          resource.text = translations['portfolio.resources.notebook'][currentLang];
        } else if (resource.text === 'Proyecto en funcionamiento') {
          resource.text = translations['portfolio.resources.workingProject'][currentLang];
        }
      });
    });
  }
}
