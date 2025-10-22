import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProjectModalService, WorkProject } from '../../sections/services/project-modal.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit, OnDestroy {
  
  isModalOpen = false;
  selectedProject: WorkProject | null = null;
  private destroy$ = new Subject<void>();

  constructor(private projectModalService: ProjectModalService) { }

  ngOnInit() {
    // Suscribirse a los observables del servicio
    this.projectModalService.isModalOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOpen => {
        this.isModalOpen = isOpen;
      });

    this.projectModalService.selectedProject$
      .pipe(takeUntil(this.destroy$))
      .subscribe(project => {
        this.selectedProject = project;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeModal() {
    this.projectModalService.closeModal();
  }
}

