import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { CompanyStore } from '../../stores';
import { CityStore } from '../../../../common/stores';

@Component({
  selector: 'app-form-update-company',
  templateUrl: './form-update-company.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormUpdateCompanyComponent implements OnInit {

  @Input() company;

  readonly vm$ = this.cityStore.vm$;
  form: FormGroup;

  constructor(
    private readonly cityStore: CityStore,
    private readonly companyStore: CompanyStore,
    private readonly fb: FormBuilder,
    private readonly modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.cityStore.getCitiesEffect();
    this.setupForm();
  }

  setupForm(): void {
    this.form = this.fb.group({
      id: [this.company.id, Validators.required],
      name: [this.company.name, Validators.required],
      description: [this.company.description, Validators.required],
      phone: [this.company.phone, Validators.required],
      website: [this.company.website],
      facebook: [this.company.facebook],
      foundedYear: [this.company.foundedYear, Validators.required],
      companySize: [this.company.companySize, Validators.required],
      averageAge: [this.company.averageAge, Validators.required],
      address: [this.company.address, Validators.required],
      citySlug: [this.company?.city?.slug, Validators.required],
    });
  }

  onSubmit(): void {
    const dataInput = {...this.form.value};
    dataInput.foundedYear = parseInt(this.form.get('foundedYear').value, 0);
    dataInput.companySize = parseInt(this.form.get('companySize').value, 0);
    dataInput.averageAge = parseInt(this.form.get('averageAge').value, 0);

    this.companyStore.editCompanyEffect(dataInput);

    this.modalRef.close();
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
