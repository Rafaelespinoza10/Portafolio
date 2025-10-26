import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, Firestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db: Firestore;
  private app: any;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.db = getFirestore(this.app);
  }

  async addTestimonial(testimonial: any): Promise<void> {
    try {
      const testimonialsRef = collection(this.db, 'testimonials');
      await addDoc(testimonialsRef, testimonial);
      console.log('Testimonial added successfully');
    } catch (error) {
      console.error('Error adding testimonial:', error);
      throw error;
    }
  }

  async getTestimonials(): Promise<any[]> {
    try {
      const testimonialsRef = collection(this.db, 'testimonials');
      const querySnapshot = await getDocs(testimonialsRef);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting testimonials:', error);
      return [];
    }
  }
}
