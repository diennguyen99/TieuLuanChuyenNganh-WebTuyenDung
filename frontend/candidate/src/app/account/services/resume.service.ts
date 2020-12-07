import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {editAvatar, editEducation} from './resume.graphql';
import {Observable} from 'rxjs';
import {FetchResult} from '@apollo/client/core';

export interface Education {
  title: string;
  yearn: number;
  institute: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(
    private apollo: Apollo
  ) { }

  editAvatar(avatar: string): void {
    this.apollo
      .mutate({
        mutation: editAvatar,
        variables: { avatar }
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        error => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  editEducation(educations): Observable<FetchResult<{ editEducation: { ok: boolean, error?: string } }>> {
    return this.apollo
      .mutate({
        mutation: editEducation,
        variables: { educations }
      });
  }
}
