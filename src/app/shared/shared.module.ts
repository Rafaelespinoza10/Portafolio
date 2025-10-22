import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/sideBar/side-bar.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ScrollProgressComponent } from './scroll-progress/scroll-progress.component';
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    SideBarComponent,
    ProfilePictureComponent,
    NavBarComponent,
    ScrollProgressComponent,
    ScrollRevealDirective,
    ProjectModalComponent,
    SafeUrlPipe
  ],
  exports: [
    SideBarComponent,
    ProfilePictureComponent,
    NavBarComponent,
    ScrollProgressComponent,
    ScrollRevealDirective,
    ProjectModalComponent,
    SafeUrlPipe
  ]
})
export class SharedModule { }
