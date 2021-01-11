import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CompanyStore } from '../../stores';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-thumbnail-modal',
  templateUrl: './add-thumbnail-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddThumbnailModalComponent {

  @Input() companyId: number;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private readonly companyStore: CompanyStore,
    private readonly modalRef: NzModalRef
  ) {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  imageSubmitHandler(image: string): void {
    this.companyStore.editThumbnailCompanyEffect({
      id: this.companyId,
      base64Thumbnail: image
    });

    this.modalRef.close();
  }

  onCloseModal(): void {
    this.modalRef.close();
  }
}
