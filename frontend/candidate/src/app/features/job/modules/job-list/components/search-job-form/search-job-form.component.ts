import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CityStore, JobSectorStore } from '../../../../../../common/stores';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-job-form',
  templateUrl: './search-job-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchJobFormComponent implements OnInit {

  @Input() params;
  readonly cityVm$ = this.cityStore.vm$;
  readonly jobSectorVm$ = this.jobSectorStore.vm$;

  form: FormGroup;

  constructor(
    private readonly cityStore: CityStore,
    private readonly jobSectorStore: JobSectorStore,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.cityStore.getCitiesEffect();
    this.jobSectorStore.getJobSectorsEffect();

    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: this.params?.name,
      city: this.params?.city ? this.params.city : 'ho-chi-minh',
      jobSector: this.params?.jobSector ? this.params.jobSector : 'it',
    });
  }

  onSubmit(): void {
    const routeParams = [
      '/jobs',
      this.form.get('city').value,
      this.form.get('jobSector').value
    ];

    if (this.form.get('name').value) {
      routeParams.splice(1, 0, this.form.get('name').value);
    }

    this.router.navigate(routeParams);
  }
}
