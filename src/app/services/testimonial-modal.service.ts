import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialModalService {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  public showModal$ = this.showModalSubject.asObservable();

  private testimonialAddedSubject = new Subject<any>();
  public testimonialAdded$ = this.testimonialAddedSubject.asObservable();

  constructor() { }

  openModal(): void {
    console.log('TestimonialModalService: Opening modal');
    this.showModalSubject.next(true);
  }

  closeModal(): void {
    console.log('TestimonialModalService: Closing modal');
    this.showModalSubject.next(false);
  }

  toggleModal(): void {
    this.showModalSubject.next(!this.showModalSubject.value);
  }

  addTestimonial(testimonial: any): void {
    this.testimonialAddedSubject.next(testimonial);
  }
}
