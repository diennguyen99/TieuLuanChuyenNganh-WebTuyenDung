import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      formJobCreate: this.fb.group({
        name: [null, Validators.required],
        address: [null, Validators.required],
        salaryMin: [null, [Validators.min(1), Validators.max(1000000)]],
        salaryMax: [null, [Validators.min(1), Validators.max(1000000)]],
        description: ['', Validators.required],
        citySlug: [null, Validators.required],
        salaryType: [null, Validators.required],
        jobTypeSlug: [null, Validators.required],
        jobSectorSlug: [null, Validators.required],
        jobPositionSlug: [null, Validators.required],
      }),
      formCheckOut: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        amount: [null, Validators.required]
      })
    });
  }
}
