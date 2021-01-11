import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CompanyStore } from '../../stores';

@Component({
  selector: 'app-add-logo-modal',
  templateUrl: './add-logo-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddLogoModalComponent {

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
    this.companyStore.editLogoCompanyEffect({
      id: this.companyId,
      base64Logo: image
    });

    this.modalRef.close();
  }

  onCloseModal(): void {
    this.modalRef.close();
  }
}
