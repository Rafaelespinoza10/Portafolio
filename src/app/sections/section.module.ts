import { BlogComponentComponent } from './components/blog-component/blog-component.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMePageComponent } from './pages/about-me/about-me.component';
import { BlogPageComponent } from './pages/blog/blog.component';
import { ContactPageComponent } from './pages/contact/contact.component';
import { PortafolioPageComponent } from './pages/portafolio/portafolio.component';
import { ResumePageComponent } from './pages/resume/resume.component';
import { LayoutPageComponent } from './layout/LayoutPage/LayoutPage.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SectionRoutingModule } from './section.routing.module';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { InformationExperienceComponent } from './components/information-experience/information-experience.component';
import { EducationCoursesComponent } from './components/education-courses/education-courses.component';
import { SkillsComponent } from './components/skills/skills.component';
import { PortafolioComponent } from './components/portafolio/portafolio.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogDetailPageComponent } from './pages/blog-detail-page/blog-detail-page.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ScrollAnimationDirective } from './directives/scroll-animation.directive';



@NgModule({
  declarations: [
    LayoutPageComponent,
    AboutMePageComponent,
    BlogPageComponent,
    ContactPageComponent,
    PortafolioPageComponent,
    ResumePageComponent,
    AboutMeComponent,
    ActivitiesComponent,  // Asegúrate de que aquí no haya una coma extra
    ContactInfoComponent,
    InformationExperienceComponent,
    EducationCoursesComponent,
    SkillsComponent,
    PortafolioComponent,
    BlogComponentComponent,
    BlogCardComponent,
    ContactInformationComponent,
    FooterComponent,
    BlogDetailPageComponent,
    HomeComponent,
    HomePageComponent,
    ScrollAnimationDirective,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SectionRoutingModule,
    ReactiveFormsModule,
  ],
  exports:[
  ]
})
export class SectionModule { }
