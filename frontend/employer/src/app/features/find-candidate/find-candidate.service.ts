import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  createSearchCampaignResumeMuation, deleteSearchCampaignResumeMuation, editSearchCampaignResumeMuation,
  listSearchCampaignResumeQuery, searchResumesQuery
} from './find-candidate.graphql';
import { OutputBase } from '../../core/models/output.model';
import { SearchCampaign } from './search-campaign.model';
import {Resume} from '../../core/models/resume.model';

interface ListSearchCampaignResponse extends OutputBase {
  totalPages: number;
  totalResults: number;
  listSearchCampaign: SearchCampaign[];
}

interface SearchResumesResponse extends OutputBase {
  totalPages: number;
  totalResults: number;
  searchCampaign: SearchCampaign;
  resumes: Resume[];
}

@Injectable({
  providedIn: 'root'
})
export class FindCandidateService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getListSearchCampaignResume(page: number): Observable<ListSearchCampaignResponse> {
    return this.apollo
      .query<any>({
        query: listSearchCampaignResumeQuery,
        variables: {
          page
        }
      })
      .pipe(
        map(( result ) => result.data.listSearchCampaignResumes)
      );
  }

  createSearchCampaignResume(dataInput): Observable<OutputBase> {
    return this.apollo
      .mutate<any>({
        mutation: createSearchCampaignResumeMuation,
        variables: dataInput
      })
      .pipe(
        map((result) => result.data.createSearchCampaignResume)
      );
  }

  editSearchCampaignResume(dataInput): Observable<OutputBase> {
    return this.apollo
      .mutate<any>({
        mutation: editSearchCampaignResumeMuation,
        variables: dataInput
      })
      .pipe(
        map((result) => result.data.editSearchCampaignResume)
      );
  }

  deleteSearchCampaignResume(id: number): Observable<OutputBase> {
    return this.apollo
      .mutate<any>({
        mutation: deleteSearchCampaignResumeMuation,
        variables: {
          id
        }
      })
      .pipe(
        map((result) => result.data.deleteSearchCampaignResume)
      );
  }

  searchResumes(id: number, page: number): Observable<SearchResumesResponse> {
    return this.apollo
      .query<any>({
        query: searchResumesQuery,
        variables: {
          id,
          page
        }
      })
      .pipe(
        map((result) => result.data.searchResumes)
      );
  }
}
