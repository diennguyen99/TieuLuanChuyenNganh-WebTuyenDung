import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCroppingComponent } from './components/image-cropping/image-cropping.component';
import { InputComponent } from './components/input/input.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ImageCroppingComponent, InputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    ImageCroppingComponent,
    InputComponent
  ]
})
export class SharedModule { }
