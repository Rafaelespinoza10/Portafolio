import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMePageComponent } from './pages/about-me/about-me.component';
import { BlogPageComponent } from './pages/blog/blog.component';
import { ContactPageComponent } from './pages/contact/contact.component';
import { PortafolioPageComponent } from './pages/portafolio/portafolio.component';
import { ResumePageComponent } from './pages/resume/resume.component';
import { BlogDetailPageComponent } from './pages/blog-detail-page/blog-detail-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [

  { path: '',
    children: [
      {path: 'home', component: HomePageComponent},
      {path: 'about-me', component: AboutMePageComponent},
      { path: 'blog/:id', component: BlogDetailPageComponent },
      { path: 'blog', component: BlogPageComponent },
      { path: 'contact', component: ContactPageComponent },
      { path: 'portafolio', component: PortafolioPageComponent },
      { path: 'resume', component: ResumePageComponent },
      { path: '**', redirectTo: 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }export const PagesRoutes = RouterModule.forChild(routes);
