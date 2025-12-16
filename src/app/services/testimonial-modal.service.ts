import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialModalService {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  public showModal$: Observable<boolean> = this.showModalSubject;

  private testimonialAddedSubject = new Subject<any>();
  public testimonialAdded$: Observable<any> = this.testimonialAddedSubject;

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
