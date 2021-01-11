import { Component, OnInit } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {CreateComponent} from '../create/create.component';
import {FindCandidateService} from '../../find-candidate.service';
import {SearchCampaign} from '../../search-campaign.model';
import {DeleteCampaignComponent} from '../delete-campaign/delete-campaign.component';

@Component({
  selector: 'app-candidate-search-campaign',
  templateUrl: './candidate-search-campaign.component.html',
  styleUrls: ['./candidate-search-campaign.component.scss']
})
export class CandidateSearchCampaignComponent implements OnInit {

  searchCampaigns: SearchCampaign[];
  totalPages: number;
  totalResults: number;
  totalItemPerPage: number;
  currentPage = 1;
  loading = false;

  constructor(
    private readonly modalService: NzModalService,
    private readonly findCandidateService: FindCandidateService
  ) { }

  ngOnInit(): void {
    this.getListSearchCampaign();
  }

  getListSearchCampaign(): void {
    this.loading = true;
    this.findCandidateService.getListSearchCampaignResume(this.currentPage)
      .subscribe((response) => {
        this.searchCampaigns = response.listSearchCampaign;
        this.totalPages = response.totalPages;
        this.totalResults = response.totalResults;
        this.totalItemPerPage = Math.ceil(this.totalResults / this.totalPages);
        this.loading = false;
      });
  }

  changePageIndex(): void {
    this.getListSearchCampaign();
  }

  onResetPage(page: number = 1): void {
    this.currentPage = page;
    this.getListSearchCampaign();
  }

  openModalCreateCampaign(): void {
    this.modalService.create({
      nzTitle: 'Create campaign',
      nzContent: CreateComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700,
      nzOnOk: () => this.onResetPage()
    });
  }

  openModalEditCampaign(index: number): void {
    this.modalService.create({
      nzTitle: 'Edit campaign',
      nzContent: CreateComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700,
      nzComponentParams: {
        searchCampaign: this.searchCampaigns[index]
      },
      nzOnOk: () => this.onResetPage(this.currentPage)
    });
  }

  openModalDeleteCampaign(id: number): void {
    this.modalService.create({
      nzTitle: 'Delete campaign',
      nzContent: DeleteCampaignComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 400,
      nzComponentParams: {
        id
      },
      nzOnOk: () => this.onResetPage()
    });
  }
}
