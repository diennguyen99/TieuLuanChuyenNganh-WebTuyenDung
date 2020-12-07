import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResumeService} from '../../containers/resume/resume.service';

@Component({
  selector: 'app-add-education-modal',
  templateUrl: './add-education-modal.component.html',
  styleUrls: ['./add-education-modal.component.scss']
})
export class AddEducationModalComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private resumeService: ResumeService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      institute: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.resumeService.education.next(this.form.value);
    this.modalRef.triggerOk();
    this.modalRef.close();
  }
}
