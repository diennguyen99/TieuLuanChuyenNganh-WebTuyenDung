import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  loading$ = new BehaviorSubject<boolean>(false);

  constructor() { }
}
