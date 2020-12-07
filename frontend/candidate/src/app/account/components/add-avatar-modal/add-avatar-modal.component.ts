import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-add-avatar-modal',
  templateUrl: './add-avatar-modal.component.html',
  styleUrls: ['./add-avatar-modal.component.scss']
})
export class AddAvatarModalComponent implements OnInit {

  selectedFile: File;
  imagePreview: string | ArrayBuffer;

  constructor(
    private modalRef: NzModalRef,
    private resumeService: ResumeService,
  ) {}

  ngOnInit(): void {
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
    } else {
      this.imagePreview = null;
    }
  }

  imageSubmitHandler(image: string): void {
    this.resumeService.editAvatar(image);
  }

  onCloseModal(): void {
    this.modalRef.close();
  }
}
