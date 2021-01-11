import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ResumeStore } from '../../stores';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-edit-avatar-modal',
  templateUrl: './edit-avatar-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAvatarModalComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private readonly resumeStore: ResumeStore,
    private readonly modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  onSubmit(): void {
    if (this.croppedImage !== '') {
      this.resumeStore.editAvatarEffect(this.croppedImage);
      this.modalRef.close();
    }
  }
}
