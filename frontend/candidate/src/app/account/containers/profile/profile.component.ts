import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobType, JobTypeService} from '../../../shared/services/job-type.service';
import {JobSector, JobSectorService} from '../../../shared/services/job-sector.service';
import {Profile, ProfileService} from './profile.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  profile: Profile;
  jobTypes: Array<JobType> = [];
  jobSectors: Array<JobSector> = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly notificationService: NzNotificationService,
    private profileService: ProfileService,
    private jobTypeService: JobTypeService,
    private jobSectorService: JobSectorService
  ) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(response => {
      this.profile = response.data.me;

      this.form = this.fb.group({
        name: [this.profile.name, Validators.required],
        sex: [this.profile.sex, Validators.required],
        jobSectorSlug: [this.profile.jobSector?.slug, Validators.required],
        jobTypeSlug: [this.profile.jobType?.slug, Validators.required],
        birthDay: [this.profile.birthDay.toString().split('T')[0], Validators.required],
        phone: [this.profile.phone, [
          Validators.required,
          Validators.pattern('^((\\\\+91-?)|0)?[0-9]{10}$')
        ]],
        address: [this.profile.address, Validators.required],
        description: [this.profile.description, Validators.required]
      });
    });


    this.jobTypeService.getAllJobTypes().subscribe(response => {
      const data = response.data.jobTypes;
      console.log(data);
      if (data.ok) {
        this.jobTypes = data.results;
      }
    });

    this.jobSectorService.getAllJobSectors().subscribe(response => {
      const data = response.data.jobSectors;
      if (data.ok) {
        this.jobSectors = data.results;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.profileService.editProfile(this.form.value).subscribe(response => {
      const data = response.data.editProfile;
      if (data.ok) {
        this.notificationService.create(
          'success',
          'Edit Profile Success',
          null
        );
      } else {
        this.notificationService.create(
          'error',
          'Edit Profile Error',
          data.error
        );
      }
    });
  }
}
