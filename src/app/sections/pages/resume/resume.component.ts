import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styles: ``
})
export class ResumePageComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    Aos.init();
  }
}
