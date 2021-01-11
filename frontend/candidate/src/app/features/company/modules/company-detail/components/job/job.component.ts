import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobComponent {

  @Input() title: string;
  @Input() slug: string;
  @Input() jobPosition: string;
  @Input() jobType: string;
  @Input() jobSector: string;
  @Input() publicAt: Date;
  @Input() image: string;
}
