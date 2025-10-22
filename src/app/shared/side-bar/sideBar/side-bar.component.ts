import { Component, OnInit } from '@angular/core';
import { ThemeService, Theme } from '../../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: []
})
export class SideBarComponent implements OnInit {
  isDarkMode: boolean = false;
  isExpanded: boolean = true; // Por defecto expandido

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    // Suscribirse a cambios de tema
    this.themeService.theme$.subscribe((theme: Theme) => {
      this.isDarkMode = theme === 'dark';
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
