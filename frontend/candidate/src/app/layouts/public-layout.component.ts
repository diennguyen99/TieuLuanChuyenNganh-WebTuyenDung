import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-public-layout',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicLayoutComponent {}
