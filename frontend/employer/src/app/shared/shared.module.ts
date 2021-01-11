import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';

// components;
import { StepperComponent } from './components/stepper/stepper.component';
import { InputComponent } from './components/input/input.component';
import {ReactiveFormsModule} from '@angular/forms';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    StepperComponent,
    InputComponent,
    TimeAgoPipe,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    CdkStepperModule,
    ReactiveFormsModule
  ],
  exports: [
    CdkStepperModule,
    StepperComponent,
    InputComponent,
    LoadingComponent,
    TimeAgoPipe,
  ]
})
export class SharedModule { }
