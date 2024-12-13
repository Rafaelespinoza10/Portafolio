import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
@Component({
  selector: 'component-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Aos.init({
      duration: 5000,
      easing: 'ease-in-out',
    });

  }

}
