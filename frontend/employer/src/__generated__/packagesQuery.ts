/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PackageType } from "./globalTypes";

// ====================================================
// GraphQL query operation: packagesQuery
// ====================================================

export interface packagesQuery_packages_results {
  __typename: "Package";
  id: number;
  name: string;
  price: number;
  duration: number;
  isFeatured: boolean;
  isSupport: boolean;
  packageType: PackageType;
}

export interface packagesQuery_packages {
  __typename: "PackagesOutput";
  results: packagesQuery_packages_results[] | null;
}

export interface packagesQuery {
  packages: packagesQuery_packages;
}
