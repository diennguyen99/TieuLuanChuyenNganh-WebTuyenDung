import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';

const AppControlComponents = [
  InputComponent,
  ButtonComponent
];

@NgModule({
  declarations: AppControlComponents,
  exports: AppControlComponents,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ControlModule { }
