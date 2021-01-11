import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeStore } from '../../stores';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-edit-education-modal',
  templateUrl: './edit-education-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEducationModalComponent implements OnInit {

  @Input() educations = [];
  @Input() index: number;
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly resumeStore: ResumeStore,
    private readonly modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const education = this.educations[this.index];
    this.form = this.fb.group({
      title: [education?.title, Validators.required],
      year: [education?.year, Validators.required],
      institute: [
        education?.institute,
        [Validators.required, Validators.min(1900), Validators.max(2021)]
      ],
    });
  }

  onSubmit(): void {
    const objEducation = this.form.value;
    objEducation.year = parseInt(objEducation.year, 0);

    const educations = this.educations.concat();
    if (this.index === null) {
      // Add
      educations.push(objEducation);
    } else {
      // Edit
      educations[this.index] = objEducation;
    }
    this.resumeStore.editEducationEffect(educations);
    this.modalRef.close();
  }

  onDelete(): void {
    if (this.index !== null) {
      const educations = this.educations.concat();
      educations.splice(this.index, 1);
      this.resumeStore.editEducationEffect(educations);
      this.modalRef.close();
    }
  }
}
