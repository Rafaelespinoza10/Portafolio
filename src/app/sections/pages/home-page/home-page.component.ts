import { Component, OnInit } from '@angular/core';
import { SEOService } from '../../../services/seo.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private seoService: SEOService) { }

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Rafael Moreno | Full Stack Developer - Website',
      description: 'Bienvenido al website de Rafael Moreno. Full Stack Developer especializado en Angular, React, Node.js y Machine Learning.',
      url: 'https://rafaelespinozadev.com/section/home'
    });
  }

}
