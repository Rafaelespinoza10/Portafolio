import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'component-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.css']
})
export class ContactInformationComponent implements OnInit {

  public email = 'rafael.moreno.espinoza10@gmail.com'
  public phone = '(444)-225-6573'
  public location = 'San Luis Potosi, Mexico'


  constructor() { }

  ngOnInit() {
  }

}
