import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { NzModalModule } from 'ng-zorro-antd/modal';

// containers
import { FindCandidateComponent } from './containers/find-candidate/find-candidate.component';

// components
import { CandidateSearchCampaignComponent } from './components/candidate-search-campaign/candidate-search-campaign.component';
import { CreateComponent } from './components/create/create.component';
import { CandidateOpenedComponent } from './components/candidate-opened/candidate-opened.component';
import { SearchCampaignDetailComponent } from './components/search-campaign-detail/search-campaign-detail.component';
import {SharedModule} from '../../shared/shared.module';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import { DeleteCampaignComponent } from './components/delete-campaign/delete-campaign.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: FindCandidateComponent,
    children: [
      { path: ':id', component: SearchCampaignDetailComponent },
      { path: '', component: CandidateSearchCampaignComponent },
    ]
  }
];

@NgModule({
  declarations: [
    FindCandidateComponent,
    CandidateSearchCampaignComponent,
    CreateComponent,
    CandidateOpenedComponent,
    SearchCampaignDetailComponent,
    DeleteCampaignComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    NgSelectModule,
    NzModalModule,
    NzPaginationModule,
    NzNotificationModule,
    SharedModule
  ]
})
export class FindCandidateModule { }
