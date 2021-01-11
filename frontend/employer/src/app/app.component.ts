import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  loading$: BehaviorSubject<boolean>;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly appService: AppService
  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.loading$.unsubscribe();
  }
}
