import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeStore } from '../../stores';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-edit-portfolio-modal',
  templateUrl: './edit-portfolio-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPortfolioModalComponent implements OnInit {

  @Input() portfolios = [];
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
    const portfolio = this.portfolios[this.index];

    this.form = this.fb.group({
      title: [portfolio?.title, Validators.required],
      image: [portfolio?.image, Validators.required],
      url: [portfolio?.url, Validators.required]
    });
  }

  onSubmit(): void {
    const portfolios = this.portfolios.concat();
    if (this.index === null) {
      // Add
      portfolios.push(this.form.value);
    } else {
      // Edit
      portfolios[this.index] = this.form.value;
    }
    this.resumeStore.editPortfolioEffect(portfolios);
    this.modalRef.close();
  }

  onDelete(): void {
    if (this.index !== null) {
      const portfolios = this.portfolios.concat();
      portfolios.splice(this.index, 1);
      this.resumeStore.editPortfolioEffect(portfolios);
      this.modalRef.close();
    }
  }
}
