/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateChargeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createChargeMutation
// ====================================================

export interface createChargeMutation_createCharge {
  __typename: "CreateChargeOutput";
  ok: boolean;
  client_secret: string | null;
  error: string | null;
}

export interface createChargeMutation {
  createCharge: createChargeMutation_createCharge;
}

export interface createChargeMutationVariables {
  createChargeInput: CreateChargeInput;
}
