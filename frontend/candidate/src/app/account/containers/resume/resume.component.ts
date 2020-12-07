import { Component, OnInit } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {AddEducationModalComponent} from '../../components/add-education-modal/add-education-modal.component';
import {FormBuilder} from '@angular/forms';
import {Award, Education, Experience, Expertise, Language, Portfolio, ResumeService} from './resume.service';
import {AddAvatarModalComponent} from '../../components/add-avatar-modal/add-avatar-modal.component';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  avatar: string;
  educations: Array<Education> = [];
  experiences: Array<Experience> = [];
  portfolios: Array<Portfolio> = [];
  expertises: Array<Expertise> = [];
  languages: Array<Language> = [];
  awards: Array<Award> = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private notificationService: NzNotificationService,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    this.resumeService.getResume().subscribe(response => {
      const resume = response.data.getResume;
      this.avatar = resume.avatar;
      this.educations = Object.assign([], resume.educations);
      this.experiences = Object.assign([], resume.experiences);
      this.portfolios = Object.assign([], resume.portfolios);
      this.expertises = Object.assign([], resume.expertises);
      this.languages = Object.assign([], resume.languages);
      this.awards = Object.assign([], resume.awards);
    });
  }

  async addEducation(): Promise<void> {
    await this.resumeService.education.subscribe(value => {
      this.educations.push(value);
    });

    this.resumeService.editEducation(this.educations).subscribe(response => {
      const data = response.data.editEducation;
      if (data.ok) {
        this.notificationService.create(
          'success',
          'Add Education Success',
          null
        );
      } else {
        this.notificationService.create(
          'error',
          'Add Education Fail',
          data.error
        );
      }
    });
  }

  openAddEducationModal(): void {
    this.modalService.create({
      nzTitle: 'Education',
      nzContent: AddEducationModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700,
      nzOnOk: () => this.addEducation()
    });
  }

  openAddAvatarModal(): void {
    this.modalService.create({
      nzTitle: 'Avatar',
      nzContent: AddAvatarModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700,
    });
  }
}
