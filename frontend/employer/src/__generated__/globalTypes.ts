/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PackageType {
  Cv = "Cv",
  Post = "Post",
}

export enum UserRole {
  Admin = "Admin",
  Candidate = "Candidate",
  Employer = "Employer",
}

export interface CreateChargeInput {
  email: string;
  token: string;
  amount: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
