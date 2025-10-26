import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ProjectModalService, WorkProject } from '../../sections/services/project-modal.service';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../i18n/translations';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit, OnDestroy {
  
  isModalOpen = false;
  selectedProject: WorkProject | null = null;
  private destroy$ = new Subject<void>();
  private languageSubscription: Subscription = new Subscription();
  
  // Traducciones de títulos del modal
  public descriptionTitle = translations['modal.description']['es'];
  public featuresTitle = translations['modal.features']['es'];
  public challengesTitle = translations['modal.challenges']['es'];
  public impactTitle = translations['modal.impact']['es'];
  public technologiesTitle = translations['modal.technologies']['es'];
  public closeAriaLabel = translations['modal.close']['es'];

  constructor(
    private projectModalService: ProjectModalService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    // Cargar traducciones iniciales
    this.loadTranslations();
    
    // Suscribirse a cambios de idioma
    this.languageSubscription.add(
      this.languageService.currentLanguage$.pipe(
        skip(1)
      ).subscribe(() => {
        this.loadTranslations();
      })
    );
    
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
    this.languageSubscription.unsubscribe();
  }

  private loadTranslations(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.descriptionTitle = translations['modal.description'][currentLang];
    this.featuresTitle = translations['modal.features'][currentLang];
    this.challengesTitle = translations['modal.challenges'][currentLang];
    this.impactTitle = translations['modal.impact'][currentLang];
    this.technologiesTitle = translations['modal.technologies'][currentLang];
    this.closeAriaLabel = translations['modal.close'][currentLang];
  }

  closeModal() {
    this.projectModalService.closeModal();
  }
}

