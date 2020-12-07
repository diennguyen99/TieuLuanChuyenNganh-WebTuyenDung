import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'image-cropping',
  templateUrl: './image-cropping.component.html',
  styleUrls: ['./image-cropping.component.scss']
})
export class ImageCroppingComponent implements AfterViewInit {

  @ViewChild('image', { static: false })
  imageElement: ElementRef;

  @Input()
  imageSrc: string;

  @Output() imageSubmit: EventEmitter<string> = new EventEmitter();

  imageDestination: string;
  private cropper: Cropper;

  constructor() {
    this.imageDestination = '';
  }

  ngAfterViewInit(): void {
    this.cropper = new Cropper(
      this.imageElement.nativeElement,
      {
        zoomable: false,
        scalable: false,
        aspectRatio: 1,
        crop: () => {
          const canvas = this.cropper.getCroppedCanvas();
          this.imageDestination = canvas.toDataURL('image/png');
        }
      }
    );
  }

  onSaveImage(): void {
    this.imageSubmit.emit(this.imageDestination);
  }
}
