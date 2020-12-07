import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApolloQueryResult, FetchResult} from '@apollo/client/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';

export interface Education {
  title: string;
  year: number;
  institute: string;
}

export interface Experience {
  title: string;
  fromDate: Date;
  toDate: Date;
  present: boolean;
  company: string;
}

export interface Portfolio {
  title: string;
  image: string;
  url: string;
}

export interface Expertise {
  label: string;
  percentage: number;
}

export interface Language {
  label: string;
  percentage: number;
}

export interface Award {
  title: string;
  year: number;
  description: string;
}

export interface Resume {
  avatar: string;
  educations: Array<Education>;
  experiences: Array<Experience>;
  portfolios: Array<Portfolio>;
  expertises: Array<Expertise>;
  languages: Array<Language>;
  awards: Array<Award>;
}

export const editEducation = gql`
  mutation editEducation($educations: [CreateEducationInput!]!) {
    editEducation(input: { educations: $educations }) {
      ok
      error
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  education: BehaviorSubject<Education> = new BehaviorSubject(null);
  experience: BehaviorSubject<Experience> = new BehaviorSubject(null);
  portfolio: BehaviorSubject<Portfolio> = new BehaviorSubject(null);
  expertise: BehaviorSubject<Expertise> = new BehaviorSubject(null);
  language: BehaviorSubject<Language> = new BehaviorSubject(null);
  award: BehaviorSubject<Award> = new BehaviorSubject(null);

  constructor(
    private readonly apollo: Apollo,
  ) { }

  getResume(): Observable<ApolloQueryResult<{ getResume: Resume }>> {
    return this.apollo
      .query({
        query: gql`
          {
            getResume {
              avatar
              educations {
                title
                year
                institute
              }
              experiences {
                title
                company
                fromDate
                toDate
                present
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
        `
      });
  }

  editEducation(educations): Observable < FetchResult < { editEducation: { ok: boolean, error?: string } } >> {
    return this.apollo
      .mutate({
        mutation: editEducation,
        variables: { educations }
      });
  }
}
