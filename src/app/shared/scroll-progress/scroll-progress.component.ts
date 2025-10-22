import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  templateUrl: './scroll-progress.component.html',
  styleUrls: ['./scroll-progress.component.css']
})
export class ScrollProgressComponent implements OnInit, OnDestroy {
  scrollProgress: number = 0;
  showBackToTop: boolean = false;

  constructor() { }

  ngOnInit() {
    this.updateScrollProgress();
  }

  ngOnDestroy() {
    // Cleanup si es necesario
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateScrollProgress();
    this.toggleBackToTop();
  }

  private updateScrollProgress() {
    const windowScroll = window.pageYOffset || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (windowScroll / height) * 100;
  }

  private toggleBackToTop() {
    this.showBackToTop = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

