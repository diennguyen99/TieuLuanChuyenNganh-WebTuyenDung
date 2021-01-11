import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ViewCvModalComponent} from '../view-cv-modal/view-cv-modal.component';
import {FindCandidateService} from '../../find-candidate.service';
import {SearchCampaign} from '../../search-campaign.model';
import {Resume} from '../../../../core/models/resume.model';

@Component({
  selector: 'app-search-campaign-detail',
  templateUrl: './search-campaign-detail.component.html',
  styleUrls: ['./search-campaign-detail.component.scss']
})
export class SearchCampaignDetailComponent implements OnInit {

  id: number;
  searchCampaign: SearchCampaign;
  resumes: Resume[];
  totalPages: number;
  totalResults: number;
  totalItemPerPage: number;
  currentPage = 1;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly modalService: NzModalService,
    private readonly findCandidateService: FindCandidateService
  ) { }

  ngOnInit(): void {
    this.getResumes();
  }

  getResumes(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params.id, 0);

      this.findCandidateService.searchResumes(this.id, 1).subscribe((response) => {
        this.searchCampaign = response.searchCampaign;
        this.resumes = response.resumes;
        this.totalPages = response.totalPages;
        this.totalResults = response.totalResults;
        this.totalItemPerPage = Math.ceil(this.totalResults / this.totalPages);
      });
    });
  }

  openModalViewCV(id: number): void {
    this.modalService.create({
      nzContent: ViewCvModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 1000,
      nzComponentParams: {
        id
      },
      nzOnOk: () => this.getResumes()
    });
  }
}
