import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';

import {CityService} from '../../../../shared/services/city.service';
import {JobTypeService} from '../../../../shared/services/job-type.service';
import {JobSectorService} from '../../../../shared/services/job-sector.service';
import {JobPositionService} from '../../../../shared/services/job-position.service';
import {JobStore} from '../../stores';
import {Job} from '../../job.model';
import {forkJoin} from 'rxjs';
import {City} from '../../../../core/models/city.model';
import {JobType} from '../../../../core/models/job-type.model';
import {JobSector} from '../../../../core/models/job-sector.model';
import {JobPosition} from '../../../../core/models/job-position.model';

@Component({
  selector: 'app-form-job-edit',
  templateUrl: './form-job-edit.component.html',
  styleUrls: ['./form-job-edit.component.scss']
})
export class FormJobEditComponent implements OnInit {

  @Input() job;

  cities: City[] = [];
  jobTypes: JobType[] = [];
  jobSectors: JobSector[] = [];
  jobPositions: JobPosition[] = [];
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalRef: NzModalRef,
    private readonly cityService: CityService,
    private readonly jobTypeService: JobTypeService,
    private readonly jobSectorService: JobSectorService,
    private readonly jobPositionService: JobPositionService,
    private readonly jobStore: JobStore
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
    });
    this.setupForm();
  }

  setupForm(): void {
    this.form = this.fb.group({
      id: [this.job?.id, Validators.required],
      name: [this.job?.name, Validators.required],
      address: [this.job?.address, Validators.required],
      salaryMin: [this.job?.salaryMin, [Validators.min(1), Validators.max(1000000)]],
      salaryMax: [this.job?.salaryMax, [Validators.min(1), Validators.max(1000000)]],
      description: [this.job?.description, Validators.required],
      citySlug: [this.job.city?.slug, Validators.required],
      salaryType: [this.job?.salaryType, Validators.required],
      jobTypeSlug: [this.job?.jobType?.slug, Validators.required],
      jobSectorSlug: [this.job?.jobSector?.slug, Validators.required],
      jobPositionSlug: [this.job?.jobPosition?.slug, Validators.required],
    });
  }

  onSubmit(): void {
    const editJobInput = { ...this.form.value };
    editJobInput.salaryMin = parseFloat(this.form.value.salaryMin);
    editJobInput.salaryMax = parseFloat(this.form.value.salaryMax);

    this.jobStore.editCompanyEffect(editJobInput);

    this.modalRef.close();
  }

  onCloseModal(): void {
    this.modalRef.close();
  }
}
