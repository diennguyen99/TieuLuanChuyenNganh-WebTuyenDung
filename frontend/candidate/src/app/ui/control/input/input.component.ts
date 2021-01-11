import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() containerClassName = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() required = true;
  @Input() inputType = 'text';
  constructor() { }

  ngOnInit(): void {
  }

}
