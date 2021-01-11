import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ResumeStore } from './stores';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  EditAvatarModalComponent,
  EditEducationModalComponent,
  EditExperienceModalComponent,
  EditPortfolioModalComponent,
  EditExpertiseModalComponent,
  EditLanguageModalComponent,
  EditAwardModalComponent
} from './components';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent implements OnInit {

  readonly vm$ = this.resumeStore.vm$;
  private configModal = {
    nzFooter: null,
    nzWidth: 600,
    nzAutofocus: null
  };

  constructor(
    private readonly resumeStore: ResumeStore,
    private readonly modalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.resumeStore.getResumeEffect();
  }

  openEditAvatarModal(): void {
    this.modalService.create({
      ...this.configModal,
      nzContent: EditAvatarModalComponent,
      nzTitle: 'Edit Avatar'
    });
  }

  openEditEducationModal(title: string, data, index: number = null): void {
    this.modalService.create({
      ...this.configModal,
      nzContent: EditEducationModalComponent,
      nzTitle: title,
      nzComponentParams: {
        educations: data,
        index
      }
    });
  }

  openEditExperienceModal(title: string, data, index: number = null): void {
    this.modalService.create({
      ...this.configModal,
      nzContent: EditExperienceModalComponent,
      nzTitle: title,
      nzComponentParams: {
        experiences: data,
        index
      }
    });
  }

  openEditPortfolioModal(title: string, data, index: number = null): void {
    this.modalService.create({
      ...this.configModal,
      nzContent: EditPortfolioModalComponent,
      nzTitle: title,
      nzComponentParams: {
        portfolios: data,
        index
      }
    });
  }

  openEditExpertiseModal(title: string, data, index: number = null): void {
    this.modalService.create({
      ...this.configModal,
      nzContent: EditExpertiseModalComponent,
      nzTitle: title,
      nzComponentParams: {
        expertises: data,
        index
      }
    });
  }

  openEditLanguageModal(title: string, data, index: number = null): void {
    this.modalService.create({
      ...this.configModal,
      nzContent: EditLanguageModalComponent,
      nzTitle: title,
      nzComponentParams: {
        languages: data,
        index
      }
    });
  }

  openEditAwardModal(title: string, data, index: number = null): void {
    this.modalService.create({
      ...this.configModal,
      nzContent: EditAwardModalComponent,
      nzTitle: title,
      nzComponentParams: {
        awards: data,
        index
      }
    });
  }
}
