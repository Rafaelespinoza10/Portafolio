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
  
  coursesByCategory: any[] = [];
  allCategories: any[] = [];
  selectedCategoryId: string | null = null;
  title = translations['education.title']['es'];
  university = translations['education.university']['es'];
  faculty = translations['education.faculty']['es'];
  career = translations['education.career']['es'];
  description = translations['education.description']['es'];
  duration = 'Sep 2019 - Actual';
  viewCertificateText = translations['course.viewCertificate']['es'];
  allCategoriesText = translations['course.all']?.['es'] || 'Todos';

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
    this.allCategoriesText = translations['course.all']?.[currentLang] || (currentLang === 'es' ? 'Todos' : 'All');
    
    // Group courses by category
    this.allCategories = [
      {
        id: 'machineLearning',
        name: translations['course.category.machineLearning'][currentLang],
        icon: '🧠',
        gradient: 'from-purple-500 to-pink-500',
        courses: [
      {
        title: translations['course.ml.title'][currentLang],
        description: translations['course.ml.description'][currentLang],
        image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1761113075/w6q7ltavgebzle4xram0.png',
        certificateUrl: 'https://www.udemy.com/certificate/UC-8ebf2992-3f66-45aa-9d96-4c66af9f650b/',
        platform: 'udemy'
      },
          {
            title: translations['course.deeplearning.title'][currentLang],
            description: translations['course.deeplearning.description'][currentLang],
            image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734058763/journal/hyrhcm3wjvnsv7nm29op.png',
            certificateUrl: 'https://learn.nvidia.com/certificates?id=fb3ca4fa6ebb4284a1f1a68d8992f6d8',
            platform: 'nvidia'
          },
          {
            title: translations['course.aiDeepLearning.title'][currentLang],
            description: translations['course.aiDeepLearning.description'][currentLang],
            image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-3edc5184-5370-4969-829b-fb90bdfb2c15.jpg',
            certificateUrl: 'https://www.udemy.com/certificate/UC-3edc5184-5370-4969-829b-fb90bdfb2c15/',
            platform: 'udemy'
          },
          {
            title: translations['course.nvidiaVideoAI.title'][currentLang],
            description: translations['course.nvidiaVideoAI.description'][currentLang],
            image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1763780820/yff4gzbsz6hseeckvmxd.png',
            certificateUrl: 'https://learn.nvidia.com/certificates?id=YOUR_CERTIFICATE_ID',
            platform: 'nvidia'
          }
        ]
      },
      {
        id: 'webDevelopment',
        name: translations['course.category.webDevelopment'][currentLang],
        icon: '💻',
        gradient: 'from-blue-500 to-cyan-500',
        courses: [
      {
        title: translations['course.angularPro.title'][currentLang],
        description: translations['course.angularPro.description'][currentLang],
        image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1750575172/jln0weajaaeyloxtjsvx.png',
        certificateUrl: 'https://cursos.devtalles.com/certificates/6gqnay1wic',
        platform: 'devtalles'
      },
      {
        title: translations['course.fullstack.title'][currentLang],
        description: translations['course.fullstack.description'][currentLang],
        image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1750575066/aap5aswqwimg6ti2biph.png',
        certificateUrl: 'https://www.udemy.com/certificate/UC-f991e756-1bea-48fb-8a16-5dda4dc14c0f/',
        platform: 'udemy'
      },
      {
        title: translations['course.angular.title'][currentLang],
        description: translations['course.angular.description'][currentLang],
        image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734128759/journal/ltdsilgrz2naondxkzrw.png',
        certificateUrl: 'https://cursos.devtalles.com/certificates/klo8xvp4su',
        platform: 'devtalles'
      },
      {
        title: translations['course.react.title'][currentLang],
        description: translations['course.react.description'][currentLang],
        image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-9f13aae9-d81b-4474-a2ce-29c83dcf0074.jpg?v=1731379207000',
        certificateUrl: 'https://www.udemy.com/certificate/UC-9f13aae9-d81b-4474-a2ce-29c83dcf0074/m',
        platform: 'udemy'
      },
      {
        title: translations['course.javascript.title'][currentLang],
        description: translations['course.javascript.description'][currentLang],
        image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-9e2da906-389f-465b-846a-8369f93c948c.jpg?v=1726119879000',
        certificateUrl: 'https://www.udemy.com/certificate/UC-9e2da906-389f-465b-846a-8369f93c948c/',
        platform: 'udemy'
      },
      {
        title: translations['course.csharp.title'][currentLang],
        description: translations['course.csharp.description'][currentLang],
        image: 'https://res.cloudinary.com/react-courses-rafa/image/upload/v1734058524/journal/tyiqaww6h8biuqvdmhes.png',
        certificateUrl: 'https://www.freecodecamp.org/certification/fcc1a16f5db-feb8-42e2-87cf-2ecaaf3b8e97/foundational-c-sharp-with-microsoft',
        platform: 'freecodecamp'
      }
        ]
      },
      {
        id: 'industrial',
        name: translations['course.category.industrial'][currentLang],
        icon: '🤖',
        gradient: 'from-orange-500 to-red-500',
        courses: [
      {
        title: translations['course.fanuc.title'][currentLang],
        description: translations['course.fanuc.description'][currentLang],
        image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-dd5649b8-a7d5-4600-bbb8-111cb981369e.jpg?v=1711323513000',
        certificateUrl: 'https://www.udemy.com/certificate/UC-dd5649b8-a7d5-4600-bbb8-111cb981369e/',
        platform: 'udemy'
      }
        ]
      }
    ];
    
    // Initialize with all categories or selected one
    this.updateFilteredCategories();
  }

  filterByCategory(categoryId: string | null): void {
    this.selectedCategoryId = categoryId;
    this.updateFilteredCategories();
  }

  private updateFilteredCategories(): void {
    if (this.selectedCategoryId === null) {
      this.coursesByCategory = [...this.allCategories];
    } else {
      this.coursesByCategory = this.allCategories.filter(cat => cat.id === this.selectedCategoryId);
    }
  }

  getCategoryTitleStyle(gradient: string): any {
    const gradientMap: { [key: string]: string } = {
      'from-purple-500 to-pink-500': 'linear-gradient(to right, #a855f7, #ec4899)',
      'from-blue-500 to-cyan-500': 'linear-gradient(to right, #3b82f6, #06b6d4)',
      'from-orange-500 to-red-500': 'linear-gradient(to right, #f97316, #ef4444)'
    };
    
    const bgGradient = gradientMap[gradient] || 'linear-gradient(to right, #3b82f6, #06b6d4)';
    
    return {
      'background': bgGradient,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'background-clip': 'text'
    };
  }

  getCategoryLineStyle(gradient: string): any {
    const gradientMap: { [key: string]: string } = {
      'from-purple-500 to-pink-500': 'linear-gradient(to right, #a855f7, #ec4899)',
      'from-blue-500 to-cyan-500': 'linear-gradient(to right, #3b82f6, #06b6d4)',
      'from-orange-500 to-red-500': 'linear-gradient(to right, #f97316, #ef4444)'
    };
    
    return {
      'background': gradientMap[gradient] || 'linear-gradient(to right, #3b82f6, #06b6d4)'
    };
  }

  getCategoryBadgeStyle(gradient: string): any {
    const gradientMap: { [key: string]: { bg: string; border: string } } = {
      'from-purple-500 to-pink-500': {
        bg: 'linear-gradient(to right, #a855f7, #ec4899)',
        border: '#ec4899cc'
      },
      'from-blue-500 to-cyan-500': {
        bg: 'linear-gradient(to right, #3b82f6, #06b6d4)',
        border: '#06b6d4cc'
      },
      'from-orange-500 to-red-500': {
        bg: 'linear-gradient(to right, #f97316, #ef4444)',
        border: '#ef4444cc'
      }
    };
    
    const style = gradientMap[gradient] || {
      bg: 'linear-gradient(to right, #3b82f6, #06b6d4)',
      border: '#06b6d4cc'
    };
    
    return {
      'background': style.bg,
      'border-color': style.border
    };
  }

  getCategoryButtonStyle(gradient: string): any {
    const gradientMap: { [key: string]: string } = {
      'from-purple-500 to-pink-500': 'linear-gradient(to right, #a855f7, #ec4899)',
      'from-blue-500 to-cyan-500': 'linear-gradient(to right, #3b82f6, #06b6d4)',
      'from-orange-500 to-red-500': 'linear-gradient(to right, #f97316, #ef4444)'
    };
    
    return {
      'background': gradientMap[gradient] || 'linear-gradient(to right, #3b82f6, #06b6d4)'
    };
  }

  getCategoryTitleStyleLight(gradient: string): any {
    // Versión más clara del gradiente para texto sobre fondo oscuro
    const gradientMap: { [key: string]: string } = {
      'from-purple-500 to-pink-500': 'linear-gradient(to right, #d8b4fe, #f9a8d4)',
      'from-blue-500 to-cyan-500': 'linear-gradient(to right, #93c5fd, #67e8f9)',
      'from-orange-500 to-red-500': 'linear-gradient(to right, #fdba74, #fca5a5)'
    };
    
    const bgGradient = gradientMap[gradient] || 'linear-gradient(to right, #93c5fd, #67e8f9)';
    
    return {
      'background': bgGradient,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'background-clip': 'text'
    };
  }

  getCategoryCardHoverShadow(gradient: string): any {
    const shadowMap: { [key: string]: string } = {
      'from-purple-500 to-pink-500': '0 25px 50px -12px rgba(168, 85, 247, 0.4)',
      'from-blue-500 to-cyan-500': '0 25px 50px -12px rgba(59, 130, 246, 0.4)',
      'from-orange-500 to-red-500': '0 25px 50px -12px rgba(249, 115, 22, 0.4)'
    };
    
    return {
      '--tw-shadow-hover': shadowMap[gradient] || '0 25px 50px -12px rgba(59, 130, 246, 0.4)'
    };
  }

  getCategoryGradientGlow(gradient: string): any {
    const glowMap: { [key: string]: string } = {
      'from-purple-500 to-pink-500': 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
      'from-blue-500 to-cyan-500': 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
      'from-orange-500 to-red-500': 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%)'
    };
    
    return {
      'background': glowMap[gradient] || 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
    };
  }

  getCategoryBorderGlow(gradient: string): any {
    const shadowMap: { [key: string]: string } = {
      'from-purple-500 to-pink-500': '0 0 30px rgba(168, 85, 247, 0.6), inset 0 0 30px rgba(168, 85, 247, 0.2)',
      'from-blue-500 to-cyan-500': '0 0 30px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(59, 130, 246, 0.2)',
      'from-orange-500 to-red-500': '0 0 30px rgba(249, 115, 22, 0.6), inset 0 0 30px rgba(249, 115, 22, 0.2)'
    };
    
    return {
      'box-shadow': shadowMap[gradient] || '0 0 30px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(59, 130, 246, 0.2)'
    };
  }

  getActivePillStyle(): any {
    // Estilo para el botón "Todos" cuando está activo
    return {
      'background': 'linear-gradient(to right, #6366f1, #8b5cf6)',
      'border': '2px solid rgba(139, 92, 246, 0.5)'
    };
  }

  getCategoryPillStyle(gradient: string): any {
    const gradientMap: { [key: string]: { bg: string; border: string } } = {
      'from-purple-500 to-pink-500': {
        bg: 'linear-gradient(to right, #a855f7, #ec4899)',
        border: '2px solid rgba(236, 72, 153, 0.5)'
      },
      'from-blue-500 to-cyan-500': {
        bg: 'linear-gradient(to right, #3b82f6, #06b6d4)',
        border: '2px solid rgba(6, 182, 212, 0.5)'
      },
      'from-orange-500 to-red-500': {
        bg: 'linear-gradient(to right, #f97316, #ef4444)',
        border: '2px solid rgba(239, 68, 68, 0.5)'
      }
    };
    
    const style = gradientMap[gradient] || {
      bg: 'linear-gradient(to right, #3b82f6, #06b6d4)',
      border: '2px solid rgba(6, 182, 212, 0.5)'
    };
    
    return {
      'background': style.bg,
      'border': style.border
    };
  }

  getPlatformLogo(platform: string): string {
    // URLs de logos públicos - si alguna no funciona, puedes reemplazarlas con URLs de Cloudinary o locales
    const logoMap: { [key: string]: string } = {
      'udemy': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Udemy_logo.svg/2560px-Udemy_logo.svg.png',
      'devtalles': 'https://img-c.udemycdn.com/user/200_H/267457580_ae55.jpg',
      'freecodecamp': 'https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg',
      'nvidia': 'https://cdn.simpleicons.org/nvidia/76b900'
    };
    return logoMap[platform] || '';
  }

  getPlatformName(platform: string): string {
    const nameMap: { [key: string]: string } = {
      'udemy': 'Udemy',
      'devtalles': 'DevTalles',
      'freecodecamp': 'FreeCodeCamp',
      'nvidia': 'NVIDIA'
    };
    return nameMap[platform] || '';
  }

  getPlatformBadgeStyle(platform: string): any {
    const styleMap: { [key: string]: any } = {
      'udemy': {
        'background': '#ffffff',
        'border': '1px solid rgba(255, 255, 255, 0.3)',
        'padding': '0.375rem 0.5rem'
      },
      'nvidia': {
        'background': '#E8F5E9',
        'border': '1px solid rgba(232, 245, 233, 0.5)',
        'padding': '0.375rem 0.75rem'
      },
      'devtalles': {
        'background': '#7c3aed',
        'border': '1px solid rgba(124, 58, 237, 0.5)',
        'padding': '0.375rem 0.75rem'
      },
      'freecodecamp': {
        'background': 'rgba(55, 65, 81, 0.6)',
        'border': '1px solid rgba(55, 65, 81, 0.5)',
        'padding': '0.375rem 0.5rem'
      }
    };
    return styleMap[platform] || {
      'background': 'rgba(55, 65, 81, 0.6)',
      'border': '1px solid rgba(55, 65, 81, 0.5)',
      'padding': '0.375rem 0.5rem'
    };
  }

  shouldShowPlatformText(platform: string): boolean {
    return platform === 'nvidia' || platform === 'devtalles';
  }
}
