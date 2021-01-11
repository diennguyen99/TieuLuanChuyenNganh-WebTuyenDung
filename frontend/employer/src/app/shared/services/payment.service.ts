import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import {Observable} from 'rxjs';
import {FetchResult} from '@apollo/client/core';
import {OutputBase} from '../../core/models/output.model';
import {map} from 'rxjs/operators';

const createChargeMutation = gql`
  mutation createChargeMutation(
    $name: String!
    $email: String!
    $phone: String!
    $jobId: Int!
    $packageId: Int!
    $token: String!
    $amount: Int!
  ) {
    createCharge(input: {
      name: $name
      email: $email
      phone: $phone
      jobId: $jobId
      packageId: $packageId
      token: $token
      amount: $amount
    }){
      ok
      error
    }
  }
`;

const paymentOpenResumeMutation = gql`
  mutation paymentOpenResume($resumeId: Int!) {
    paymentOpenResume(input: {
      resumeId: $resumeId
    }){
      ok
      error
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  createPayment(
    name: string,
    email: string,
    phone: string,
    jobId: number,
    packageId: number,
    token: string,
    amount: number
  ): Observable<FetchResult<{ createCharge: OutputBase }>> {
    return this.apollo
      .mutate({
        mutation: createChargeMutation,
        variables: {
          name,
          email,
          phone,
          jobId,
          packageId,
          token,
          amount
        }
      });
  }

  paymentOpenResume(resumeId: number): Observable<OutputBase> {
    return this.apollo
      .mutate<any>({
        mutation: paymentOpenResumeMutation,
        variables: {
          resumeId
        }
      })
      .pipe(
        map((result) => result.data.paymentOpenResume)
      );
  }
}
