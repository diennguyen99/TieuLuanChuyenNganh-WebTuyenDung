import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResumeStore} from '../../stores';
import {NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-edit-award-modal',
  templateUrl: './edit-award-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAwardModalComponent implements OnInit {

  @Input() awards = [];
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

  private initForm(): void {
    const award = this.awards[this.index];

    this.form = this.fb.group({
      title: [award?.title, Validators.required],
      year: [award?.year, Validators.required],
      description: [award?.description, Validators.required]
    });
  }

  onSubmit(): void {
    const objAward = this.form.value;
    objAward.year = parseInt(objAward.year, 0);

    const awards = this.awards.concat();
    if (this.index === null) {
      // Add
      awards.push(objAward);
    } else {
      // Edit
      awards[this.index] = objAward;
    }
    this.resumeStore.editAwardEffect(awards);
    this.modalRef.close();
  }

  onDelete(): void {
    if (this.index !== null) {
      const awards = this.awards.concat();
      awards.splice(this.index, 1);
      this.resumeStore.editAwardEffect(awards);
      this.modalRef.close();
    }
  }
}
