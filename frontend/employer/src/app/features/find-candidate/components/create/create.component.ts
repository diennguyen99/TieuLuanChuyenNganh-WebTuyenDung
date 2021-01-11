import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FindCandidateService} from '../../find-candidate.service';
import {CityService} from '../../../../shared/services/city.service';
import {JobTypeService} from '../../../../shared/services/job-type.service';
import {JobSectorService} from '../../../../shared/services/job-sector.service';
import {JobPositionService} from '../../../../shared/services/job-position.service';
import {forkJoin} from 'rxjs';
import {City} from '../../../../core/models/city.model';
import {JobType} from '../../../../core/models/job-type.model';
import {JobSector} from '../../../../core/models/job-sector.model';
import {JobPosition} from '../../../../core/models/job-position.model';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {SearchCampaign} from '../../search-campaign.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @Input() searchCampaign: SearchCampaign;
  cities: City[] = [];
  jobTypes: JobType[] = [];
  jobSectors: JobSector[] = [];
  jobPositions: JobPosition[] = [];
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalRef: NzModalRef,
    private readonly notificationService: NzNotificationService,
    private readonly findCandidateService: FindCandidateService,
    private readonly cityService: CityService,
    private readonly jobTypeService: JobTypeService,
    private readonly jobSectorService: JobSectorService,
    private readonly jobPositionService: JobPositionService
  ) { }

  ngOnInit(): void {
    forkJoin(
      [
        this.cityService.getCities(),
        this.jobTypeService.getJobTypes(),
        this.jobSectorService.getJobSectors(),
        this.jobPositionService.getJobPositions()
      ]
    ).subscribe(([cities, jobTypes, jobSectors, jobPositions]) => {
      this.cities = cities.data.allCities.cities;
      this.jobTypes = jobTypes.data.jobTypes.results;
      this.jobSectors = jobSectors.data.jobSectors.results;
      this.jobPositions = jobPositions.data.jobPositions.results;
      this.setupForm();
    });
  }

  setupForm(): void {
    this.form = this.fb.group({
      name: [this.searchCampaign?.name, Validators.required],
      jobSectorSlug: [this.searchCampaign?.jobSector.slug, Validators.required],
      jobTypeSlug: [this.searchCampaign?.jobType.slug, Validators.required],
      jobPositionSlug: [this.searchCampaign?.jobPosition.slug, Validators.required],
      citySlug: [this.searchCampaign?.city.slug, Validators.required],
      skills: [this.searchCampaign?.skills, Validators.required]
    });
  }

  onSubmit(): void {
    const data = {...this.form.value};

    if (!this.searchCampaign) {
      this.findCandidateService.createSearchCampaignResume(data).subscribe((response) => {
        if (response.ok) {
          this.notificationService.success(
            'Success',
            'Create search Campaign success!'
          );
          this.modalRef.triggerOk();
        } else {
          this.notificationService.error(
            'Error',
            'An error occurred! Please come back later!'
          );
        }

        this.modalRef.close();
      });
    } else {
      data.id = this.searchCampaign.id;
      this.findCandidateService.editSearchCampaignResume(data).subscribe((response) => {
        if (response.ok) {
          this.notificationService.success(
            'Success',
            'Edit Search Campaign success!'
          );
          this.modalRef.triggerOk();
        } else {
          this.notificationService.error(
            'Error',
            'An error occurred! Please come back later!'
          );
        }

        this.modalRef.close();
      });
    }
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
