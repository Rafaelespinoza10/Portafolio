import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WorkProject {
  name: string;
  imageSrc: string;
  description: string;
  technologies: string[];
  detailedDescription?: string;
  features?: string[];
  challenges?: string[];
  impact?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectModalService {
  
  private isModalOpenSubject = new BehaviorSubject<boolean>(false);
  private selectedProjectSubject = new BehaviorSubject<WorkProject | null>(null);
  
  public isModalOpen$ = this.isModalOpenSubject.asObservable();
  public selectedProject$ = this.selectedProjectSubject.asObservable();

  constructor() { }

  /**
   * Abre el modal con el proyecto seleccionado
   */
  openModal(project: WorkProject) {
    this.selectedProjectSubject.next(project);
    this.isModalOpenSubject.next(true);
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  }

  /**
   * Cierra el modal
   */
  closeModal() {
    this.isModalOpenSubject.next(false);
    this.selectedProjectSubject.next(null);
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
  }
}

