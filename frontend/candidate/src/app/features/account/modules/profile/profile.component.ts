import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CityStore, JobPositionStore, JobSectorStore, JobTypeStore } from '../../../../common/stores';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileStore } from './stores';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [ProfileStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  form: FormGroup;

  readonly vmJobTypes$ = this.jobTypeStore.vm$;
  readonly vmCity$ = this.cityStore.vm$;
  readonly vmJobSectors$ = this.jobSectorStore.vm$;
  readonly vmJobPositions$ = this.jobPositionStore.vm$;
  readonly vm$ = this.profileStore.vm$;

  profile;

  constructor(
    private readonly jobPositionStore: JobPositionStore,
    private readonly cityStore: CityStore,
    private readonly jobTypeStore: JobTypeStore,
    private readonly jobSectorStore: JobSectorStore,
    private readonly profileStore: ProfileStore,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.jobPositionStore.getJobPositionsEffect();
    this.cityStore.getCitiesEffect();
    this.jobTypeStore.getJobTypesEffect();
    this.jobSectorStore.getJobSectorsEffect();
    this.profileStore.getProfileEffect();
    this.vm$.subscribe(({ profile }) => {
      this.profile = profile;
      this.initForm();
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [this.profile?.name, Validators.required],
      sex: [this.profile?.sex, Validators.required],
      jobPositionSlug: [this.profile?.jobPosition?.slug, Validators.required],
      jobSectorSlug: [this.profile?.jobSector?.slug, Validators.required],
      jobTypeSlug: [this.profile?.jobType?.slug, Validators.required],
      birthDay: [this.profile?.birthDay?.toString().split('T')[0], Validators.required],
      phone: [this.profile?.phone, [
        Validators.required,
        Validators.pattern('^((\\\\+91-?)|0)?[0-9]{10}$')
      ]],
      citySlug: [this.profile?.city?.slug, Validators.required],
      address: [this.profile?.address, Validators.required],
      description: [this.profile?.description, Validators.required]
    });
  }

  onSubmit(): void {
    this.profileStore.editProfileEffect(this.form.value);
  }
}
