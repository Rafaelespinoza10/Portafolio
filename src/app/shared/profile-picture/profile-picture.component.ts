import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'shared-profile-picture',
  templateUrl: './profile-picture.component.html',
  styles: ``
})
export class ProfilePictureComponent implements OnInit, OnDestroy {
  
  public isDarkMode = true; // Por defecto tema oscuro
  private themeSubscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Suscribirse a los cambios de tema
    this.themeSubscription.add(
      this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
        this.isDarkMode = theme === 'dark';
      })
    );
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
