import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './sections/layout/LayoutPage/LayoutPage.component';

const routes: Routes = [

  {
    path:'section',
    component: LayoutPageComponent,
    loadChildren: () => import('./sections/section.module').then(m => m.SectionModule),
  },
  {
    path:'**',
    redirectTo: 'section'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
