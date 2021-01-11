import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkStepper } from '@angular/cdk/stepper';
import { forkJoin } from 'rxjs';

import { CityService } from '../../../../shared/services/city.service';
import { JobTypeService } from '../../../../shared/services/job-type.service';
import { JobSectorService } from '../../../../shared/services/job-sector.service';
import { City } from '../../../../core/models/city.model';
import { JobType } from '../../../../core/models/job-type.model';
import { JobSector } from '../../../../core/models/job-sector.model';
import { JobService } from '../../job.service';
import { JobPosition } from '../../../../core/models/job-position.model';
import { JobPositionService } from '../../../../shared/services/job-position.service';

@Component({
  selector: 'app-form-job-create',
  templateUrl: './form-job-create.component.html',
  styleUrls: ['./form-job-create.component.scss']
})
export class FormJobCreateComponent implements OnInit {

  @Input() appStepper: CdkStepper;
  @Input() form: FormGroup;

  cities: City[] = [];
  jobTypes: JobType[] = [];
  jobSectors: JobSector[] = [];
  jobPositions: JobPosition[] = [];
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cityService: CityService,
    private readonly jobTypeService: JobTypeService,
    private readonly jobSectorService: JobSectorService,
    private readonly jobPositionService: JobPositionService,
    private readonly jobService: JobService
  ) {}

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
  }

  onSubmit(): void {
    this.loading = true;
    const createJobInput = { ...this.form.value };
    createJobInput.salaryMin = parseFloat(this.form.value.salaryMin);
    createJobInput.salaryMax = parseFloat(this.form.value.salaryMax);

    this.jobService.createJob(createJobInput).subscribe(response => {
      const data = response.data.createJob;
      if (data.ok) {
        this.jobService.newJobId.next(data.jobId);
      }
      this.loading = false;
      this.appStepper.next();
    });
  }
}
