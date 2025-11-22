import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from './side-bar/sideBar/side-bar.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ScrollProgressComponent } from './scroll-progress/scroll-progress.component';
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';
import { HoverOnScrollDirective } from './directives/hover-on-scroll.directive';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { TestimonialModalComponent } from './testimonial-modal/testimonial-modal.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { TranslatePipe } from './pipes/translate.pipe';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { LanguageSwitcherBubbleComponent } from './language-switcher-bubble/language-switcher-bubble.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    SideBarComponent,
    ProfilePictureComponent,
    NavBarComponent,
    ScrollProgressComponent,
    ScrollRevealDirective,
    HoverOnScrollDirective,
    ProjectModalComponent,
    TestimonialModalComponent,
    SafeUrlPipe,
    TranslatePipe,
    LanguageSwitcherComponent,
    LanguageSwitcherBubbleComponent
  ],
  exports: [
    SideBarComponent,
    ProfilePictureComponent,
    NavBarComponent,
    ScrollProgressComponent,
    ScrollRevealDirective,
    HoverOnScrollDirective,
    ProjectModalComponent,
    TestimonialModalComponent,
    SafeUrlPipe,
    TranslatePipe,
    LanguageSwitcherComponent,
    LanguageSwitcherBubbleComponent
  ]
})
export class SharedModule { }
