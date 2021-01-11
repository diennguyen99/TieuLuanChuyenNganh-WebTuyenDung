import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CityStore, JobSectorStore } from '../../common/stores';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  readonly cityVm$ = this.cityStore.vm$;
  readonly jobSectorVm$ = this.jobSectorStore.vm$;
  form: FormGroup;

  constructor(
    private readonly cityStore: CityStore,
    private readonly jobSectorStore: JobSectorStore,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.cityStore.getCitiesEffect();
    this.jobSectorStore.getJobSectorsEffect();
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: null,
      city: 'ho-chi-minh',
      jobSector: 'it',
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
