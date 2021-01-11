import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeStore } from '../../stores';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-edit-expertise-modal',
  templateUrl: './edit-expertise-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditExpertiseModalComponent implements OnInit {

  @Input() expertises = [];
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
    const expertise = this.expertises[this.index];

    this.form = this.fb.group({
      label: [expertise?.label, Validators.required],
      percentage: [expertise?.percentage, Validators.required],
    });
  }

  onSubmit(): void {
    const objExpertise = this.form.value;
    objExpertise.percentage = parseInt(objExpertise.percentage, 0);

    const expertises = this.expertises.concat();
    if (this.index === null) {
      // Add
      expertises.push(objExpertise);
    } else {
      // Edit
      expertises[this.index] = objExpertise;
    }
    this.resumeStore.editExpertiseEffect(expertises);
    this.modalRef.close();
  }

  onDelete(): void {
    if (this.index !== null) {
      const expertises = this.expertises.concat();
      expertises.splice(this.index, 1);
      this.resumeStore.editExpertiseEffect(expertises);
      this.modalRef.close();
    }
  }
}
