import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {OutputBase} from '../../core/models/output.model';
import {Resume} from '../../core/models/resume.model';

const resumePrivateQuery = gql`
  query getResumePrivateQuery($id: Int!) {
    resume(input: {
      id: $id
    }) {
      ok
      error
      resume {
        avatar
        skills {
          name
          percentage
        }
        educations {
          title
          year
          institute
        }
        experiences {
          title
          fromDate
          toDate
          present
          company
        }
        portfolios {
          title
          image
          url
        }
        expertises {
          label
          percentage
        }
        languages {
          label
          percentage
        }
        awards {
          title
          year
          description
        }
      }
    }
  }
`;

interface ResumeResponse extends OutputBase {
  resume: Resume;
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getResumePrivate(id: number): Observable<ResumeResponse> {
    return this.apollo
      .query<any>({
        query: resumePrivateQuery,
        variables: {
          id
        }
      })
      .pipe(
        map((result) => result.data.resume)
      );
  };
}
