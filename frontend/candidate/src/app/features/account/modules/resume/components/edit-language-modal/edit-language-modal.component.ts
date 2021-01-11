import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResumeStore} from '../../stores';
import {NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-edit-language-modal',
  templateUrl: './edit-language-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditLanguageModalComponent implements OnInit {

  @Input() languages = [];
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
    const language = this.languages[this.index];

    this.form = this.fb.group({
      label: [language?.label, Validators.required],
      percentage: [language?.percentage, Validators.required],
    });
  }

  onSubmit(): void {
    const objLanguage = this.form.value;
    objLanguage.percentage = parseInt(objLanguage.percentage, 0);

    const languages = this.languages.concat();
    if (this.index === null) {
      // Add
      languages.push(objLanguage);
    } else {
      // Edit
      languages[this.index] = objLanguage;
    }
    this.resumeStore.editLanguageEffect(languages);
    this.modalRef.close();
  }

  onDelete(): void {
    if (this.index !== null) {
      const languages = this.languages.concat();
      languages.splice(this.index, 1);
      this.resumeStore.editLanguageEffect(languages);
      this.modalRef.close();
    }
  }
}
