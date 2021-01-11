import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ResumeStore} from '../../stores';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-edit-experience-modal',
  templateUrl: './edit-experience-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditExperienceModalComponent implements OnInit {

  @Input() experiences = [];
  @Input() index: number;
  form: FormGroup;

  constructor(
    private readonly resumeStore: ResumeStore,
    private readonly fb: FormBuilder,
    private readonly modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const experience = this.experiences[this.index];

    this.form = this.fb.group({
      title: [experience?.title, Validators.required],
      fromDate: [experience?.fromDate],
      toDate: [experience?.toDate],
      present: [experience?.present ? experience.present : false],
      company: [experience?.company, Validators.required]
    });
  }

  onSubmit(): void {
    const experiences = this.experiences.concat();
    if (this.index === null) {
      // Add
      experiences.push(this.form.value);
    } else {
      // Edit
      experiences[this.index] = this.form.value;
    }
    this.resumeStore.editExperienceEffect(experiences);
    this.modalRef.close();
  }

  onDelete(): void {
    if (this.index !== null) {
      const experiences = this.experiences.concat();
      experiences.splice(this.index, 1);
      this.resumeStore.editExperienceEffect(experiences);
      this.modalRef.close();
    }
  }
}
