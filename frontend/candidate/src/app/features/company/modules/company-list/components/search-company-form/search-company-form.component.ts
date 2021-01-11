import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-company-form',
  templateUrl: './search-company-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchCompanyFormComponent implements OnInit {

  @Input() params;
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nameCompany: this.params?.nameCompany ? this.params.nameCompany : '',
    });
  }

  onSubmit(): void {
    if (this.form.get('nameCompany').value.trim() === '') {
      this.router.navigate([
          'companies',
        ]
      );
    } else {
      this.router.navigate([
          'companies',
          'query',
          this.form.get('nameCompany').value
        ]
      );
    }
  }
}
