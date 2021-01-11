import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {FindCandidateService} from '../../find-candidate.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-delete-campaign',
  templateUrl: './delete-campaign.component.html',
  styleUrls: ['./delete-campaign.component.scss']
})
export class DeleteCampaignComponent implements OnInit {

  @Input() id: number;

  constructor(
    private readonly modalRef: NzModalRef,
    private readonly notificationService: NzNotificationService,
    private readonly findCandidateService: FindCandidateService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.findCandidateService.deleteSearchCampaignResume(this.id).subscribe((response) => {
      if (response.ok) {
        this.notificationService.success(
          'Success',
          'Delete success'
        );
        this.modalRef.triggerOk();
        this.closeModal();
      } else {
        this.notificationService.error(
          'Error',
          'An error occurred! Please come back later!'
        );
      }
    });
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
