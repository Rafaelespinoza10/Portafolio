import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/sideBar/side-bar.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    SideBarComponent,
    ProfilePictureComponent,
    NavBarComponent
  ],
  exports: [
    SideBarComponent,
    ProfilePictureComponent,
    NavBarComponent,
  ]
})
export class SharedModule { }
