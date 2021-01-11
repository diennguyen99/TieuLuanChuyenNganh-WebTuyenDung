import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};



export type Package = {
  __typename?: 'Package';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  price: Scalars['Float'];
  duration: Scalars['Float'];
  isFeatured: Scalars['Boolean'];
  isSupport: Scalars['Boolean'];
  packageType: PackageType;
};


export enum PackageType {
  Cv = 'Cv',
  Post = 'Post'
}

export type City = {
  __typename?: 'City';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  foundedYear?: Maybe<Scalars['Int']>;
  companySize?: Maybe<Scalars['Int']>;
  averageAge?: Maybe<Scalars['Int']>;
  city?: Maybe<City>;
  cityId?: Maybe<Scalars['Int']>;
  address?: Maybe<Scalars['String']>;
  point?: Maybe<Scalars['Int']>;
  jobs?: Maybe<Array<Job>>;
};

export type JobSector = {
  __typename?: 'JobSector';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type JobType = {
  __typename?: 'JobType';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type JobPosition = {
  __typename?: 'JobPosition';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type Job = {
  __typename?: 'Job';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  slug: Scalars['String'];
  address: Scalars['String'];
  salaryType: SalaryType;
  salaryMax?: Maybe<Scalars['Float']>;
  salaryMin?: Maybe<Scalars['Float']>;
  description: Scalars['String'];
  user: User;
  userId: Scalars['Int'];
  company: Company;
  companyId: Scalars['Int'];
  jobPosition: JobPosition;
  jobPositionId: Scalars['Int'];
  jobSector: JobSector;
  jobSectorId: Scalars['Int'];
  jobType: JobType;
  jobTypeId: Scalars['Int'];
  city: City;
  cityId: Scalars['Int'];
  promotedUntil?: Maybe<Scalars['DateTime']>;
};

export enum SalaryType {
  Monthly = 'Monthly',
  Weekly = 'Weekly',
  Hourly = 'Hourly',
  Negotiable = 'Negotiable'
}

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  transactionId: Scalars['String'];
  user: User;
  package: Package;
  packageId: Scalars['Int'];
  job?: Maybe<Job>;
  jobId?: Maybe<Scalars['Int']>;
};

export type Education = {
  __typename?: 'Education';
  title: Scalars['String'];
  year: Scalars['Float'];
  institute: Scalars['String'];
};

export type MySkill = {
  __typename?: 'MySkill';
  name: Scalars['String'];
  percentage: Scalars['Float'];
};

export type Experience = {
  __typename?: 'Experience';
  title: Scalars['String'];
  fromDate?: Maybe<Scalars['String']>;
  toDate?: Maybe<Scalars['String']>;
  present: Scalars['Boolean'];
  company: Scalars['String'];
};

export type Portfolio = {
  __typename?: 'Portfolio';
  title: Scalars['String'];
  image: Scalars['String'];
  url: Scalars['String'];
};

export type Expertise = {
  __typename?: 'Expertise';
  label: Scalars['String'];
  percentage: Scalars['Int'];
};

export type Language = {
  __typename?: 'Language';
  label: Scalars['String'];
  percentage: Scalars['Int'];
};

export type Award = {
  __typename?: 'Award';
  title: Scalars['String'];
  year: Scalars['Float'];
  description: Scalars['String'];
};

export type Resume = {
  __typename?: 'Resume';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Int'];
  avatar?: Maybe<Scalars['String']>;
  skills: Array<MySkill>;
  educations: Array<Education>;
  experiences: Array<Experience>;
  portfolios: Array<Portfolio>;
  expertises: Array<Expertise>;
  languages: Array<Language>;
  awards: Array<Award>;
  resumeOpen: ResumeOpen;
};

export type ResumeOpen = {
  __typename?: 'ResumeOpen';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
  resume: Resume;
  resumeStatus?: Maybe<ResumeStatus>;
  resumeType: ResumeType;
};

export enum ResumeStatus {
  New = 'New',
  Dismiss = 'Dismiss',
  Approved = 'Approved'
}

export type ResumeType = {
  __typename?: 'ResumeType';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  user: User;
  resumeOpens: Array<ResumeOpen>;
};

export type SearchCampaign = {
  __typename?: 'SearchCampaign';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Int'];
  name: Scalars['String'];
  jobPosition: JobPosition;
  jobPositionId: Scalars['Int'];
  jobType: JobType;
  jobTypeId: Scalars['Int'];
  jobSector: JobSector;
  jobSectorId: Scalars['Int'];
  city: City;
  cityId: Scalars['Int'];
  skills: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  phone?: Maybe<Scalars['String']>;
  sex?: Maybe<UserSex>;
  birthDay?: Maybe<Scalars['DateTime']>;
  address?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  jobPosition?: Maybe<JobPosition>;
  jobType?: Maybe<JobType>;
  jobSector?: Maybe<JobSector>;
  payments: Array<Payment>;
  resumeTypes: Array<ResumeType>;
  resumeOpens: Array<ResumeOpen>;
  searchCampaignList: Array<SearchCampaign>;
  verified: Scalars['Boolean'];
  city?: Maybe<City>;
  cityId: Scalars['Int'];
};

export enum UserRole {
  Candidate = 'Candidate',
  Employer = 'Employer',
  Admin = 'Admin'
}

export enum UserSex {
  Male = 'Male',
  Female = 'Female'
}

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type UserProfileOutput = {
  __typename?: 'UserProfileOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type EditProfileOutput = {
  __typename?: 'EditProfileOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ChangePasswordOutput = {
  __typename?: 'ChangePasswordOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type VerifyEmailOutput = {
  __typename?: 'VerifyEmailOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateChargeOutput = {
  __typename?: 'CreateChargeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type PaymentOpenResumeOutput = {
  __typename?: 'PaymentOpenResumeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreatePackageOutput = {
  __typename?: 'CreatePackageOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditPackageOutput = {
  __typename?: 'EditPackageOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type PackagesOutput = {
  __typename?: 'PackagesOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  results?: Maybe<Array<Package>>;
};

export type EditCompanyOutput = {
  __typename?: 'EditCompanyOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CompanyOutput = {
  __typename?: 'CompanyOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  company?: Maybe<Company>;
};

export type EditLogoOutput = {
  __typename?: 'EditLogoOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
};

export type EditThumbnailOutput = {
  __typename?: 'EditThumbnailOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
};

export type EditAvatarOutput = {
  __typename?: 'EditAvatarOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateResumeOutput = {
  __typename?: 'CreateResumeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditEducationOutput = {
  __typename?: 'EditEducationOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditMySkillOutput = {
  __typename?: 'EditMySkillOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditExperienceOutput = {
  __typename?: 'EditExperienceOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditPortfolioOutput = {
  __typename?: 'EditPortfolioOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditExpertiseOutput = {
  __typename?: 'EditExpertiseOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditLanguageOutput = {
  __typename?: 'EditLanguageOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditAwardOutput = {
  __typename?: 'EditAwardOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateResumeTypeOutput = {
  __typename?: 'CreateResumeTypeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditStatusResumeOpenOutput = {
  __typename?: 'EditStatusResumeOpenOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ResumeOutput = {
  __typename?: 'ResumeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  resume: Resume;
};

export type EditTypeResumeOpenOutput = {
  __typename?: 'EditTypeResumeOpenOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ResumesOpenNewOutput = {
  __typename?: 'ResumesOpenNewOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  resumesOpen?: Maybe<Array<ResumeOpen>>;
};

export type ResumeTypesOutput = {
  __typename?: 'ResumeTypesOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  resumeTypes?: Maybe<Array<ResumeType>>;
};

export type CreateJobTypeOutput = {
  __typename?: 'CreateJobTypeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  id?: Maybe<Scalars['Int']>;
};

export type CreateJobSectorOutput = {
  __typename?: 'CreateJobSectorOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  id?: Maybe<Scalars['Int']>;
};

export type CreateJobOutput = {
  __typename?: 'CreateJobOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  jobId?: Maybe<Scalars['Int']>;
};

export type JobTypesOutput = {
  __typename?: 'JobTypesOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  results?: Maybe<Array<JobType>>;
};

export type JobSectorsOutput = {
  __typename?: 'JobSectorsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  results?: Maybe<Array<JobSector>>;
};

export type CreateJobPositionOutput = {
  __typename?: 'CreateJobPositionOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  id?: Maybe<Scalars['Int']>;
};

export type JobPositionsOutput = {
  __typename?: 'JobPositionsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  results?: Maybe<Array<JobPosition>>;
};

export type JobsByCandidateOutput = {
  __typename?: 'JobsByCandidateOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  jobs?: Maybe<Array<Job>>;
};

export type JobOutput = {
  __typename?: 'JobOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  job?: Maybe<Job>;
};

export type EditJobOutput = {
  __typename?: 'EditJobOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteJobOutput = {
  __typename?: 'DeleteJobOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type JobClientOutput = {
  __typename?: 'JobClientOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  job?: Maybe<Job>;
};

export type EditJobPositionOutput = {
  __typename?: 'EditJobPositionOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteJobPositionOutput = {
  __typename?: 'DeleteJobPositionOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AdminJobPositionsOutput = {
  __typename?: 'AdminJobPositionsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  jobPositions?: Maybe<Array<JobPosition>>;
};

export type EditJobTypeOutput = {
  __typename?: 'EditJobTypeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteJobTypeOutput = {
  __typename?: 'DeleteJobTypeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditJobSectorOutput = {
  __typename?: 'EditJobSectorOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteJobSectorOutput = {
  __typename?: 'DeleteJobSectorOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AdminJobSectorsOutput = {
  __typename?: 'AdminJobSectorsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  jobSectors?: Maybe<Array<JobSector>>;
};

export type CreateCityOutput = {
  __typename?: 'CreateCityOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  id?: Maybe<Scalars['Int']>;
};

export type CitiesOutput = {
  __typename?: 'CitiesOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  cities?: Maybe<Array<City>>;
};

export type EditCityOutput = {
  __typename?: 'EditCityOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteCityOutput = {
  __typename?: 'DeleteCityOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type SearchResumesOutput = {
  __typename?: 'SearchResumesOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  searchCampaign?: Maybe<SearchCampaign>;
  resumes?: Maybe<Array<Resume>>;
};

export type CreateSearchCampaignResumeOutput = {
  __typename?: 'CreateSearchCampaignResumeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ListSearchCampaignOutput = {
  __typename?: 'ListSearchCampaignOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  listSearchCampaign?: Maybe<Array<SearchCampaign>>;
};

export type EditSearchCampaignResumeOutput = {
  __typename?: 'EditSearchCampaignResumeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteSearchCampaignResumeOutput = {
  __typename?: 'DeleteSearchCampaignResumeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type SearchJobsOutput = {
  __typename?: 'SearchJobsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  jobs?: Maybe<Array<Job>>;
};

export type SearchCompaniesOutput = {
  __typename?: 'SearchCompaniesOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  companies?: Maybe<Array<Company>>;
};

export type Skill = {
  __typename?: 'Skill';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
};

export type CreateSkillOutput = {
  __typename?: 'CreateSkillOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type SkillsOutput = {
  __typename?: 'SkillsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  results: Array<Skill>;
};

export type AppliedJob = {
  __typename?: 'AppliedJob';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  job?: Maybe<Job>;
  name: Scalars['String'];
  email: Scalars['String'];
  cvUpload?: Maybe<Scalars['String']>;
  cvOnline?: Maybe<Resume>;
  content?: Maybe<Scalars['String']>;
};

export type UploadCvOutput = {
  __typename?: 'UploadCvOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AppliedJobsOutput = {
  __typename?: 'AppliedJobsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  appliedJobs?: Maybe<Array<AppliedJob>>;
};

export type School = {
  __typename?: 'School';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  subName: Scalars['String'];
};

export type CreateSchoolOutput = {
  __typename?: 'CreateSchoolOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  id?: Maybe<Scalars['Int']>;
};

export type EditSchoolOutput = {
  __typename?: 'EditSchoolOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteSchoolOutput = {
  __typename?: 'DeleteSchoolOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type SchoolsOutput = {
  __typename?: 'SchoolsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  schools?: Maybe<Array<School>>;
};

export type AdminSchoolsOutput = {
  __typename?: 'AdminSchoolsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  schools?: Maybe<Array<School>>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  userProfile: UserProfileOutput;
  packages: PackagesOutput;
  company: CompanyOutput;
  companyByEmployer: CompanyOutput;
  companyBySlug: CompanyOutput;
  resume: ResumeOutput;
  getResume: Resume;
  resumeTypes: ResumeTypesOutput;
  resumesOpenNew: ResumesOpenNewOutput;
  jobPositions: JobPositionsOutput;
  adminJobPositions: AdminJobPositionsOutput;
  jobTypes: JobTypesOutput;
  jobSectors: JobSectorsOutput;
  adminJobSectors: AdminJobSectorsOutput;
  jobsByCandidate: JobsByCandidateOutput;
  job: JobOutput;
  jobBySlug: JobClientOutput;
  allCities: CitiesOutput;
  searchResumes: SearchResumesOutput;
  listSearchCampaignResumes: ListSearchCampaignOutput;
  searchJobs: SearchJobsOutput;
  searchCompanies: SearchCompaniesOutput;
  getSkills: SkillsOutput;
  getCandidatesApply: AppliedJobsOutput;
  getAppliedJobs: AppliedJobsOutput;
  schools: SchoolsOutput;
  adminSchools: AdminSchoolsOutput;
};


export type QueryUserProfileArgs = {
  userId: Scalars['Float'];
};


export type QueryCompanyArgs = {
  input: CompanyInput;
};


export type QueryCompanyBySlugArgs = {
  input: CompanyBySlugInput;
};


export type QueryResumeArgs = {
  input: ResumeInput;
};


export type QueryResumeTypesArgs = {
  input: ResumeTypesInput;
};


export type QueryAdminJobPositionsArgs = {
  input: AdminJobPositionsInput;
};


export type QueryAdminJobSectorsArgs = {
  input: AdminJobSectorsInput;
};


export type QueryJobsByCandidateArgs = {
  input: JobsByCandidateInput;
};


export type QueryJobArgs = {
  input: JobInput;
};


export type QueryJobBySlugArgs = {
  input: JobClientInput;
};


export type QuerySearchResumesArgs = {
  input: SearchResumesInput;
};


export type QueryListSearchCampaignResumesArgs = {
  input: ListSearchCampaignInput;
};


export type QuerySearchJobsArgs = {
  input: SearchJobsInput;
};


export type QuerySearchCompaniesArgs = {
  input: SearchCompaniesInput;
};


export type QueryGetCandidatesApplyArgs = {
  input: AppliedJobsInput;
};


export type QueryGetAppliedJobsArgs = {
  input: AppliedJobsInput;
};


export type QueryAdminSchoolsArgs = {
  input: AdminSchoolsInput;
};

export type CompanyInput = {
  id: Scalars['Int'];
};

export type CompanyBySlugInput = {
  slug?: Maybe<Scalars['String']>;
};

export type ResumeInput = {
  id: Scalars['Int'];
};

export type ResumeTypesInput = {
  page?: Maybe<Scalars['Int']>;
};

export type AdminJobPositionsInput = {
  page?: Maybe<Scalars['Int']>;
};

export type AdminJobSectorsInput = {
  page?: Maybe<Scalars['Int']>;
};

export type JobsByCandidateInput = {
  page?: Maybe<Scalars['Int']>;
};

export type JobInput = {
  id: Scalars['Int'];
};

export type JobClientInput = {
  slug: Scalars['String'];
};

export type SearchResumesInput = {
  page?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type ListSearchCampaignInput = {
  page?: Maybe<Scalars['Int']>;
};

export type SearchJobsInput = {
  page?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  citySlug?: Maybe<Scalars['String']>;
  jobSectorSlug?: Maybe<Scalars['String']>;
  jobTypeSlug?: Maybe<Scalars['String']>;
};

export type SearchCompaniesInput = {
  page?: Maybe<Scalars['Int']>;
  nameCompany?: Maybe<Scalars['String']>;
};

export type AppliedJobsInput = {
  page?: Maybe<Scalars['Int']>;
};

export type AdminSchoolsInput = {
  page?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountOutput;
  login: LoginOutput;
  editProfile: EditProfileOutput;
  changePassword: ChangePasswordOutput;
  verifyEmail: VerifyEmailOutput;
  createCharge: CreateChargeOutput;
  paymentOpenResume: PaymentOpenResumeOutput;
  createPackage: CreatePackageOutput;
  editPackage: EditPackageOutput;
  editCompany: EditCompanyOutput;
  editLogoCompany: EditLogoOutput;
  editThumbnailCompany: EditThumbnailOutput;
  createResume: CreateResumeOutput;
  editAvatar: EditAvatarOutput;
  editSkill: EditMySkillOutput;
  editEducation: EditEducationOutput;
  editExperience: EditExperienceOutput;
  editPortfolio: EditPortfolioOutput;
  editExpertise: EditExpertiseOutput;
  editLanguage: EditLanguageOutput;
  editAward: EditAwardOutput;
  createResumeType: CreateResumeTypeOutput;
  editTypeResumeOpen: EditTypeResumeOpenOutput;
  editStateResumeOpen: EditStatusResumeOpenOutput;
  createJobPosition: CreateJobPositionOutput;
  editJobPosition: EditJobPositionOutput;
  deleteJobPosition: DeleteJobPositionOutput;
  createJobType: CreateJobTypeOutput;
  editJobType: EditJobTypeOutput;
  deleteJobType: DeleteJobTypeOutput;
  createJobSector: CreateJobSectorOutput;
  editJobSector: EditJobSectorOutput;
  deleteJobSector: DeleteJobSectorOutput;
  createJob: CreateJobOutput;
  editJob: EditJobOutput;
  deleteJob: DeleteJobOutput;
  createCity: CreateCityOutput;
  editCity: EditCityOutput;
  deleteCity: DeleteCityOutput;
  createSearchCampaignResume: CreateSearchCampaignResumeOutput;
  editSearchCampaignResume: EditSearchCampaignResumeOutput;
  deleteSearchCampaignResume: DeleteSearchCampaignResumeOutput;
  createSkill: CreateSkillOutput;
  uploadCv: UploadCvOutput;
  createSchool: CreateSchoolOutput;
  editSchool: EditSchoolOutput;
  deleteSchool: DeleteSchoolOutput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};


export type MutationCreateChargeArgs = {
  input: CreateChargeInput;
};


export type MutationPaymentOpenResumeArgs = {
  input: PaymentOpenResumeInput;
};


export type MutationCreatePackageArgs = {
  input: CreatePackageInput;
};


export type MutationEditPackageArgs = {
  input: EditPackageInput;
};


export type MutationEditCompanyArgs = {
  input: EditCompanyInput;
};


export type MutationEditLogoCompanyArgs = {
  input: EditLogoInput;
};


export type MutationEditThumbnailCompanyArgs = {
  input: EditThumbnailInput;
};


export type MutationCreateResumeArgs = {
  input: CreateResumeInput;
};


export type MutationEditAvatarArgs = {
  input: EditAvatarInput;
};


export type MutationEditSkillArgs = {
  input: EditMySkillInput;
};


export type MutationEditEducationArgs = {
  input: EditEducationInput;
};


export type MutationEditExperienceArgs = {
  input: EditExperienceInput;
};


export type MutationEditPortfolioArgs = {
  input: EditPortfolioInput;
};


export type MutationEditExpertiseArgs = {
  input: EditExpertiseInput;
};


export type MutationEditLanguageArgs = {
  input: EditLanguageInput;
};


export type MutationEditAwardArgs = {
  input: EditAwardInput;
};


export type MutationCreateResumeTypeArgs = {
  input: CreateResumeTypeInput;
};


export type MutationEditTypeResumeOpenArgs = {
  input: EditTypeResumeOpenInput;
};


export type MutationEditStateResumeOpenArgs = {
  input: EditStatusResumeOpenInput;
};


export type MutationCreateJobPositionArgs = {
  input: CreateJobPositionInput;
};


export type MutationEditJobPositionArgs = {
  input: EditJobPositionInput;
};


export type MutationDeleteJobPositionArgs = {
  input: DeleteJobPositionInput;
};


export type MutationCreateJobTypeArgs = {
  input: CreateJobTypeInput;
};


export type MutationEditJobTypeArgs = {
  input: EditJobTypeInput;
};


export type MutationDeleteJobTypeArgs = {
  input: DeleteJobTypeInput;
};


export type MutationCreateJobSectorArgs = {
  input: CreateJobSectorInput;
};


export type MutationEditJobSectorArgs = {
  input: EditJobSectorInput;
};


export type MutationDeleteJobSectorArgs = {
  input: DeleteJobSectorInput;
};


export type MutationCreateJobArgs = {
  input: CreateJobInput;
};


export type MutationEditJobArgs = {
  input: EditJobInput;
};


export type MutationDeleteJobArgs = {
  input: DeleteJobInput;
};


export type MutationCreateCityArgs = {
  input: CreateCityInput;
};


export type MutationEditCityArgs = {
  input: EditCityInput;
};


export type MutationDeleteCityArgs = {
  input: DeleteCityInput;
};


export type MutationCreateSearchCampaignResumeArgs = {
  input: CreateSearchCampaignResumeInput;
};


export type MutationEditSearchCampaignResumeArgs = {
  input: EditSearchCampaignResumeInput;
};


export type MutationDeleteSearchCampaignResumeArgs = {
  input: DeleteSearchCampaignResumeInput;
};


export type MutationCreateSkillArgs = {
  input: CreateSkillInput;
};


export type MutationUploadCvArgs = {
  input: UploadCvInput;
};


export type MutationCreateSchoolArgs = {
  input: CreateSchoolInput;
};


export type MutationEditSchoolArgs = {
  input: EditSchoolInput;
};


export type MutationDeleteSchoolArgs = {
  input: DeleteSchoolInput;
};

export type CreateAccountInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type EditProfileInput = {
  name: Scalars['String'];
  sex: UserSex;
  birthDay: Scalars['DateTime'];
  phone: Scalars['String'];
  address: Scalars['String'];
  description: Scalars['String'];
  jobPositionSlug: Scalars['String'];
  jobTypeSlug: Scalars['String'];
  jobSectorSlug: Scalars['String'];
  citySlug: Scalars['String'];
};

export type ChangePasswordInput = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type VerifyEmailInput = {
  code: Scalars['String'];
};

export type CreateChargeInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  jobId: Scalars['Int'];
  packageId: Scalars['Int'];
  token: Scalars['String'];
  amount: Scalars['Int'];
};

export type PaymentOpenResumeInput = {
  resumeId: Scalars['Int'];
};

export type CreatePackageInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  duration: Scalars['Float'];
  isFeatured: Scalars['Boolean'];
  isSupport: Scalars['Boolean'];
  packageType: PackageType;
};

export type EditPackageInput = {
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  isFeatured?: Maybe<Scalars['Boolean']>;
  isSupport?: Maybe<Scalars['Boolean']>;
  packageType?: Maybe<PackageType>;
  packageId: Scalars['Float'];
};

export type EditCompanyInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  foundedYear?: Maybe<Scalars['Int']>;
  companySize?: Maybe<Scalars['Int']>;
  averageAge?: Maybe<Scalars['Int']>;
  address?: Maybe<Scalars['String']>;
  citySlug: Scalars['String'];
};

export type EditLogoInput = {
  id: Scalars['Int'];
  base64Logo: Scalars['String'];
};

export type EditThumbnailInput = {
  id: Scalars['Int'];
  base64Thumbnail: Scalars['String'];
};

export type CreateResumeInput = {
  coverLetter?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<CreateMySkillInput>>;
  educations?: Maybe<Array<CreateEducationInput>>;
  experiences?: Maybe<Array<CreateExperienceInput>>;
  portfolios?: Maybe<Array<CreatePortfolioInput>>;
  expertises?: Maybe<Array<CreateExpertiseInput>>;
  languages?: Maybe<Array<CreateLanguageInput>>;
  awards?: Maybe<Array<CreateAwardInput>>;
};

export type CreateMySkillInput = {
  name: Scalars['String'];
  percentage: Scalars['Float'];
};

export type CreateEducationInput = {
  title: Scalars['String'];
  year: Scalars['Float'];
  institute: Scalars['String'];
};

export type CreateExperienceInput = {
  title: Scalars['String'];
  fromDate?: Maybe<Scalars['String']>;
  toDate?: Maybe<Scalars['String']>;
  present: Scalars['Boolean'];
  company: Scalars['String'];
};

export type CreatePortfolioInput = {
  title: Scalars['String'];
  image: Scalars['String'];
  url: Scalars['String'];
};

export type CreateExpertiseInput = {
  label: Scalars['String'];
  percentage: Scalars['Float'];
};

export type CreateLanguageInput = {
  label: Scalars['String'];
  percentage: Scalars['Float'];
};

export type CreateAwardInput = {
  title: Scalars['String'];
  year: Scalars['Float'];
  description: Scalars['String'];
};

export type EditAvatarInput = {
  avatar: Scalars['String'];
};

export type EditMySkillInput = {
  skills: Array<CreateMySkillInput>;
};

export type EditEducationInput = {
  educations: Array<CreateEducationInput>;
};

export type EditExperienceInput = {
  experiences: Array<CreateExperienceInput>;
};

export type EditPortfolioInput = {
  portfolios: Array<CreatePortfolioInput>;
};

export type EditExpertiseInput = {
  expertises: Array<CreateExpertiseInput>;
};

export type EditLanguageInput = {
  languages: Array<CreateLanguageInput>;
};

export type EditAwardInput = {
  awards: Array<CreateAwardInput>;
};

export type CreateResumeTypeInput = {
  name: Scalars['String'];
};

export type EditTypeResumeOpenInput = {
  id: Scalars['Int'];
  idResumeType: Scalars['Int'];
};

export type EditStatusResumeOpenInput = {
  id: Scalars['Int'];
  resumeStatus?: Maybe<ResumeStatus>;
};

export type CreateJobPositionInput = {
  name: Scalars['String'];
};

export type EditJobPositionInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type DeleteJobPositionInput = {
  id: Scalars['Int'];
};

export type CreateJobTypeInput = {
  name: Scalars['String'];
};

export type EditJobTypeInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type DeleteJobTypeInput = {
  id: Scalars['Int'];
};

export type CreateJobSectorInput = {
  name: Scalars['String'];
};

export type EditJobSectorInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type DeleteJobSectorInput = {
  id: Scalars['Int'];
};

export type CreateJobInput = {
  name: Scalars['String'];
  address: Scalars['String'];
  salaryType: SalaryType;
  salaryMax?: Maybe<Scalars['Float']>;
  salaryMin?: Maybe<Scalars['Float']>;
  description: Scalars['String'];
  citySlug: Scalars['String'];
  jobPositionSlug: Scalars['String'];
  jobTypeSlug: Scalars['String'];
  jobSectorSlug: Scalars['String'];
};

export type EditJobInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  address: Scalars['String'];
  salaryType: SalaryType;
  salaryMax?: Maybe<Scalars['Float']>;
  salaryMin?: Maybe<Scalars['Float']>;
  description: Scalars['String'];
  citySlug: Scalars['String'];
  jobPositionSlug: Scalars['String'];
  jobTypeSlug: Scalars['String'];
  jobSectorSlug: Scalars['String'];
};

export type DeleteJobInput = {
  id: Scalars['Int'];
};

export type CreateCityInput = {
  name: Scalars['String'];
};

export type EditCityInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type DeleteCityInput = {
  id: Scalars['Int'];
};

export type CreateSearchCampaignResumeInput = {
  name: Scalars['String'];
  skills: Array<Scalars['String']>;
  jobPositionSlug: Scalars['String'];
  jobTypeSlug: Scalars['String'];
  jobSectorSlug: Scalars['String'];
  citySlug: Scalars['String'];
};

export type EditSearchCampaignResumeInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  skills: Array<Scalars['String']>;
  jobPositionSlug: Scalars['String'];
  jobTypeSlug: Scalars['String'];
  jobSectorSlug: Scalars['String'];
  citySlug: Scalars['String'];
};

export type DeleteSearchCampaignResumeInput = {
  id: Scalars['Int'];
};

export type CreateSkillInput = {
  name: Scalars['String'];
};

export type UploadCvInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  jobSlug: Scalars['String'];
  file?: Maybe<Scalars['String']>;
  myCvOnline: Scalars['Boolean'];
};

export type CreateSchoolInput = {
  name: Scalars['String'];
  subName: Scalars['String'];
};

export type EditSchoolInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  subName: Scalars['String'];
};

export type DeleteSchoolInput = {
  id: Scalars['Int'];
};

export type CitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type CitiesQuery = (
  { __typename?: 'Query' }
  & { allCities: (
    { __typename?: 'CitiesOutput' }
    & Pick<CitiesOutput, 'ok' | 'error'>
    & { cities?: Maybe<Array<(
      { __typename?: 'City' }
      & Pick<City, 'name' | 'slug'>
    )>> }
  ) }
);

export type JobPositionsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type JobPositionsQueryQuery = (
  { __typename?: 'Query' }
  & { jobPositions: (
    { __typename?: 'JobPositionsOutput' }
    & Pick<JobPositionsOutput, 'ok' | 'error'>
    & { results?: Maybe<Array<(
      { __typename?: 'JobPosition' }
      & Pick<JobPosition, 'name' | 'slug'>
    )>> }
  ) }
);

export type JobSectorsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type JobSectorsQueryQuery = (
  { __typename?: 'Query' }
  & { jobSectors: (
    { __typename?: 'JobSectorsOutput' }
    & Pick<JobSectorsOutput, 'ok' | 'error'>
    & { results?: Maybe<Array<(
      { __typename?: 'JobSector' }
      & Pick<JobSector, 'name' | 'slug'>
    )>> }
  ) }
);

export type JobTypesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type JobTypesQueryQuery = (
  { __typename?: 'Query' }
  & { jobTypes: (
    { __typename?: 'JobTypesOutput' }
    & Pick<JobTypesOutput, 'ok' | 'error'>
    & { results?: Maybe<Array<(
      { __typename?: 'JobType' }
      & Pick<JobType, 'name' | 'slug'>
    )>> }
  ) }
);

export type LoginMutationMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutationMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginOutput' }
    & Pick<LoginOutput, 'ok' | 'error' | 'token'>
  ) }
);

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'CreateAccountOutput' }
    & Pick<CreateAccountOutput, 'ok' | 'error'>
  ) }
);

export type AppliedJobsQueryVariables = Exact<{
  input: AppliedJobsInput;
}>;


export type AppliedJobsQuery = (
  { __typename?: 'Query' }
  & { getAppliedJobs: (
    { __typename?: 'AppliedJobsOutput' }
    & Pick<AppliedJobsOutput, 'ok' | 'error' | 'totalPages' | 'totalResults'>
    & { appliedJobs?: Maybe<Array<(
      { __typename?: 'AppliedJob' }
      & { job?: Maybe<(
        { __typename?: 'Job' }
        & Pick<Job, 'name' | 'slug' | 'updatedAt'>
        & { company: (
          { __typename?: 'Company' }
          & Pick<Company, 'name' | 'logo'>
        ), city: (
          { __typename?: 'City' }
          & Pick<City, 'name'>
        ), jobSector: (
          { __typename?: 'JobSector' }
          & Pick<JobSector, 'name'>
        ), jobPosition: (
          { __typename?: 'JobPosition' }
          & Pick<JobPosition, 'name'>
        ), jobType: (
          { __typename?: 'JobType' }
          & Pick<JobType, 'name'>
        ) }
      )> }
    )>> }
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'ChangePasswordOutput' }
    & Pick<ChangePasswordOutput, 'ok' | 'error'>
  ) }
);

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'email' | 'name' | 'phone' | 'sex' | 'birthDay' | 'address' | 'description'>
    & { jobPosition?: Maybe<(
      { __typename?: 'JobPosition' }
      & Pick<JobPosition, 'slug'>
    )>, city?: Maybe<(
      { __typename?: 'City' }
      & Pick<City, 'slug'>
    )>, jobType?: Maybe<(
      { __typename?: 'JobType' }
      & Pick<JobType, 'slug'>
    )>, jobSector?: Maybe<(
      { __typename?: 'JobSector' }
      & Pick<JobSector, 'slug'>
    )> }
  ) }
);

export type EditProfileMutationVariables = Exact<{
  input: EditProfileInput;
}>;


export type EditProfileMutation = (
  { __typename?: 'Mutation' }
  & { editProfile: (
    { __typename?: 'EditProfileOutput' }
    & Pick<EditProfileOutput, 'ok' | 'error'>
  ) }
);

export type ResumeQueryVariables = Exact<{ [key: string]: never; }>;


export type ResumeQuery = (
  { __typename?: 'Query' }
  & { getResume: (
    { __typename?: 'Resume' }
    & Pick<Resume, 'avatar'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ), educations: Array<(
      { __typename?: 'Education' }
      & Pick<Education, 'title' | 'year' | 'institute'>
    )>, experiences: Array<(
      { __typename?: 'Experience' }
      & Pick<Experience, 'title' | 'company' | 'fromDate' | 'toDate' | 'present'>
    )>, portfolios: Array<(
      { __typename?: 'Portfolio' }
      & Pick<Portfolio, 'title' | 'image' | 'url'>
    )>, expertises: Array<(
      { __typename?: 'Expertise' }
      & Pick<Expertise, 'label' | 'percentage'>
    )>, languages: Array<(
      { __typename?: 'Language' }
      & Pick<Language, 'label' | 'percentage'>
    )>, awards: Array<(
      { __typename?: 'Award' }
      & Pick<Award, 'title' | 'year' | 'description'>
    )> }
  ) }
);

export type EditAvatarMutationVariables = Exact<{
  input: EditAvatarInput;
}>;


export type EditAvatarMutation = (
  { __typename?: 'Mutation' }
  & { editAvatar: (
    { __typename?: 'EditAvatarOutput' }
    & Pick<EditAvatarOutput, 'ok' | 'error'>
  ) }
);

export type EditEducationMutationVariables = Exact<{
  educations: Array<CreateEducationInput> | CreateEducationInput;
}>;


export type EditEducationMutation = (
  { __typename?: 'Mutation' }
  & { editEducation: (
    { __typename?: 'EditEducationOutput' }
    & Pick<EditEducationOutput, 'ok' | 'error'>
  ) }
);

export type EditExperienceMutationVariables = Exact<{
  experiences: Array<CreateExperienceInput> | CreateExperienceInput;
}>;


export type EditExperienceMutation = (
  { __typename?: 'Mutation' }
  & { editExperience: (
    { __typename?: 'EditExperienceOutput' }
    & Pick<EditExperienceOutput, 'ok' | 'error'>
  ) }
);

export type EditPortfolioMutationVariables = Exact<{
  portfolios: Array<CreatePortfolioInput> | CreatePortfolioInput;
}>;


export type EditPortfolioMutation = (
  { __typename?: 'Mutation' }
  & { editPortfolio: (
    { __typename?: 'EditPortfolioOutput' }
    & Pick<EditPortfolioOutput, 'ok' | 'error'>
  ) }
);

export type EditExpertiseMutationVariables = Exact<{
  expertises: Array<CreateExpertiseInput> | CreateExpertiseInput;
}>;


export type EditExpertiseMutation = (
  { __typename?: 'Mutation' }
  & { editExpertise: (
    { __typename?: 'EditExpertiseOutput' }
    & Pick<EditExpertiseOutput, 'ok' | 'error'>
  ) }
);

export type EditLanguageMutationVariables = Exact<{
  languages: Array<CreateLanguageInput> | CreateLanguageInput;
}>;


export type EditLanguageMutation = (
  { __typename?: 'Mutation' }
  & { editLanguage: (
    { __typename?: 'EditLanguageOutput' }
    & Pick<EditLanguageOutput, 'ok' | 'error'>
  ) }
);

export type EditAwardMutationVariables = Exact<{
  awards: Array<CreateAwardInput> | CreateAwardInput;
}>;


export type EditAwardMutation = (
  { __typename?: 'Mutation' }
  & { editAward: (
    { __typename?: 'EditAwardOutput' }
    & Pick<EditAwardOutput, 'ok' | 'error'>
  ) }
);

export type CompanyQueryVariables = Exact<{
  input: CompanyBySlugInput;
}>;


export type CompanyQuery = (
  { __typename?: 'Query' }
  & { companyBySlug: (
    { __typename?: 'CompanyOutput' }
    & Pick<CompanyOutput, 'ok' | 'error'>
    & { company?: Maybe<(
      { __typename?: 'Company' }
      & Pick<Company, 'name' | 'facebook' | 'phone' | 'foundedYear' | 'companySize' | 'averageAge' | 'logo' | 'thumbnail' | 'description'>
      & { jobs?: Maybe<Array<(
        { __typename?: 'Job' }
        & Pick<Job, 'name' | 'slug' | 'updatedAt'>
        & { jobPosition: (
          { __typename?: 'JobPosition' }
          & Pick<JobPosition, 'name'>
        ), jobType: (
          { __typename?: 'JobType' }
          & Pick<JobType, 'name'>
        ), jobSector: (
          { __typename?: 'JobSector' }
          & Pick<JobSector, 'name'>
        ) }
      )>> }
    )> }
  ) }
);

export type FilterCompanyQueryVariables = Exact<{
  input: SearchCompaniesInput;
}>;


export type FilterCompanyQuery = (
  { __typename?: 'Query' }
  & { searchCompanies: (
    { __typename?: 'SearchCompaniesOutput' }
    & Pick<SearchCompaniesOutput, 'ok' | 'error' | 'totalResults' | 'totalPages'>
    & { companies?: Maybe<Array<(
      { __typename?: 'Company' }
      & Pick<Company, 'name' | 'slug' | 'logo' | 'thumbnail' | 'description'>
      & { city?: Maybe<(
        { __typename?: 'City' }
        & Pick<City, 'name'>
      )>, jobs?: Maybe<Array<(
        { __typename?: 'Job' }
        & Pick<Job, 'name'>
      )>> }
    )>> }
  ) }
);

export type ApplyJobMutationVariables = Exact<{
  input: UploadCvInput;
}>;


export type ApplyJobMutation = (
  { __typename?: 'Mutation' }
  & { uploadCv: (
    { __typename?: 'UploadCvOutput' }
    & Pick<UploadCvOutput, 'ok' | 'error'>
  ) }
);

export type JobQueryVariables = Exact<{
  input: JobClientInput;
}>;


export type JobQuery = (
  { __typename?: 'Query' }
  & { jobBySlug: (
    { __typename?: 'JobClientOutput' }
    & Pick<JobClientOutput, 'ok' | 'error'>
    & { job?: Maybe<(
      { __typename?: 'Job' }
      & Pick<Job, 'name' | 'slug' | 'address' | 'salaryType' | 'salaryMax' | 'salaryMin' | 'description'>
      & { company: (
        { __typename?: 'Company' }
        & Pick<Company, 'name' | 'logo' | 'foundedYear' | 'companySize' | 'averageAge'>
      ), city: (
        { __typename?: 'City' }
        & Pick<City, 'name'>
      ), jobPosition: (
        { __typename?: 'JobPosition' }
        & Pick<JobPosition, 'name'>
      ), jobType: (
        { __typename?: 'JobType' }
        & Pick<JobType, 'name'>
      ), jobSector: (
        { __typename?: 'JobSector' }
        & Pick<JobSector, 'name'>
      ) }
    )> }
  ) }
);

export type FilterJobQueryVariables = Exact<{
  input: SearchJobsInput;
}>;


export type FilterJobQuery = (
  { __typename?: 'Query' }
  & { searchJobs: (
    { __typename?: 'SearchJobsOutput' }
    & Pick<SearchJobsOutput, 'ok' | 'error' | 'totalPages' | 'totalResults'>
    & { jobs?: Maybe<Array<(
      { __typename?: 'Job' }
      & Pick<Job, 'slug' | 'name' | 'updatedAt'>
      & { company: (
        { __typename?: 'Company' }
        & Pick<Company, 'logo' | 'name'>
      ), city: (
        { __typename?: 'City' }
        & Pick<City, 'name'>
      ), jobPosition: (
        { __typename?: 'JobPosition' }
        & Pick<JobPosition, 'name'>
      ), jobType: (
        { __typename?: 'JobType' }
        & Pick<JobType, 'name'>
      ), jobSector: (
        { __typename?: 'JobSector' }
        & Pick<JobSector, 'name'>
      ) }
    )>> }
  ) }
);

export const CitiesDocument = gql`
    query cities {
  allCities {
    ok
    error
    cities {
      name
      slug
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CitiesGQL extends Apollo.Query<CitiesQuery, CitiesQueryVariables> {
    document = CitiesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const JobPositionsQueryDocument = gql`
    query jobPositionsQuery {
  jobPositions {
    ok
    error
    results {
      name
      slug
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobPositionsQueryGQL extends Apollo.Query<JobPositionsQueryQuery, JobPositionsQueryQueryVariables> {
    document = JobPositionsQueryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const JobSectorsQueryDocument = gql`
    query jobSectorsQuery {
  jobSectors {
    ok
    error
    results {
      name
      slug
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobSectorsQueryGQL extends Apollo.Query<JobSectorsQueryQuery, JobSectorsQueryQueryVariables> {
    document = JobSectorsQueryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const JobTypesQueryDocument = gql`
    query jobTypesQuery {
  jobTypes {
    ok
    error
    results {
      name
      slug
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobTypesQueryGQL extends Apollo.Query<JobTypesQueryQuery, JobTypesQueryQueryVariables> {
    document = JobTypesQueryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginMutationDocument = gql`
    mutation LoginMutation($input: LoginInput!) {
  login(input: $input) {
    ok
    error
    token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginMutationGQL extends Apollo.Mutation<LoginMutationMutation, LoginMutationMutationVariables> {
    document = LoginMutationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateAccountDocument = gql`
    mutation createAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ok
    error
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAccountGQL extends Apollo.Mutation<CreateAccountMutation, CreateAccountMutationVariables> {
    document = CreateAccountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AppliedJobsDocument = gql`
    query appliedJobs($input: AppliedJobsInput!) {
  getAppliedJobs(input: $input) {
    ok
    error
    totalPages
    totalResults
    appliedJobs {
      job {
        name
        slug
        company {
          name
          logo
        }
        city {
          name
        }
        jobSector {
          name
        }
        jobPosition {
          name
        }
        jobType {
          name
        }
        updatedAt
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AppliedJobsGQL extends Apollo.Query<AppliedJobsQuery, AppliedJobsQueryVariables> {
    document = AppliedJobsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ChangePasswordDocument = gql`
    mutation changePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    ok
    error
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ChangePasswordGQL extends Apollo.Mutation<ChangePasswordMutation, ChangePasswordMutationVariables> {
    document = ChangePasswordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ProfileDocument = gql`
    query profile {
  me {
    email
    name
    phone
    sex
    birthDay
    address
    description
    jobPosition {
      slug
    }
    city {
      slug
    }
    jobType {
      slug
    }
    jobSector {
      slug
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ProfileGQL extends Apollo.Query<ProfileQuery, ProfileQueryVariables> {
    document = ProfileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditProfileDocument = gql`
    mutation editProfile($input: EditProfileInput!) {
  editProfile(input: $input) {
    ok
    error
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditProfileGQL extends Apollo.Mutation<EditProfileMutation, EditProfileMutationVariables> {
    document = EditProfileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ResumeDocument = gql`
    query resume {
  getResume {
    avatar
    user {
      name
    }
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
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ResumeGQL extends Apollo.Query<ResumeQuery, ResumeQueryVariables> {
    document = ResumeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditAvatarDocument = gql`
    mutation editAvatar($input: EditAvatarInput!) {
  editAvatar(input: $input) {
    ok
    error
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditAvatarGQL extends Apollo.Mutation<EditAvatarMutation, EditAvatarMutationVariables> {
    document = EditAvatarDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditEducationDocument = gql`
    mutation editEducation($educations: [CreateEducationInput!]!) {
  editEducation(input: {educations: $educations}) {
    ok
    error
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditEducationGQL extends Apollo.Mutation<EditEducationMutation, EditEducationMutationVariables> {
    document = EditEducationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditExperienceDocument = gql`
    mutation editExperience($experiences: [CreateExperienceInput!]!) {
  editExperience(input: {experiences: $experiences}) {
    ok
    error
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditExperienceGQL extends Apollo.Mutation<EditExperienceMutation, EditExperienceMutationVariables> {
    document = EditExperienceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditPortfolioDocument = gql`
    mutation editPortfolio($portfolios: [CreatePortfolioInput!]!) {
  editPortfolio(input: {portfolios: $portfolios}) {
    ok
    error
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditPortfolioGQL extends Apollo.Mutation<EditPortfolioMutation, EditPortfolioMutationVariables> {
    document = EditPortfolioDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditExpertiseDocument = gql`
    mutation editExpertise($expertises: [CreateExpertiseInput!]!) {
  editExpertise(input: {expertises: $expertises}) {
    ok
    error
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditExpertiseGQL extends Apollo.Mutation<EditExpertiseMutation, EditExpertiseMutationVariables> {
    document = EditExpertiseDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditLanguageDocument = gql`
    mutation editLanguage($languages: [CreateLanguageInput!]!) {
  editLanguage(input: {languages: $languages}) {
    ok
    error
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditLanguageGQL extends Apollo.Mutation<EditLanguageMutation, EditLanguageMutationVariables> {
    document = EditLanguageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditAwardDocument = gql`
    mutation editAward($awards: [CreateAwardInput!]!) {
  editAward(input: {awards: $awards}) {
    ok
    error
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditAwardGQL extends Apollo.Mutation<EditAwardMutation, EditAwardMutationVariables> {
    document = EditAwardDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CompanyDocument = gql`
    query company($input: CompanyBySlugInput!) {
  companyBySlug(input: $input) {
    ok
    error
    company {
      name
      facebook
      phone
      foundedYear
      companySize
      averageAge
      logo
      thumbnail
      description
      jobs {
        name
        slug
        updatedAt
        jobPosition {
          name
        }
        jobType {
          name
        }
        jobSector {
          name
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CompanyGQL extends Apollo.Query<CompanyQuery, CompanyQueryVariables> {
    document = CompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FilterCompanyDocument = gql`
    query filterCompany($input: SearchCompaniesInput!) {
  searchCompanies(input: $input) {
    ok
    error
    totalResults
    totalPages
    companies {
      name
      slug
      logo
      thumbnail
      description
      city {
        name
      }
      jobs {
        name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FilterCompanyGQL extends Apollo.Query<FilterCompanyQuery, FilterCompanyQueryVariables> {
    document = FilterCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ApplyJobDocument = gql`
    mutation applyJob($input: UploadCvInput!) {
  uploadCv(input: $input) {
    ok
    error
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ApplyJobGQL extends Apollo.Mutation<ApplyJobMutation, ApplyJobMutationVariables> {
    document = ApplyJobDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const JobDocument = gql`
    query job($input: JobClientInput!) {
  jobBySlug(input: $input) {
    ok
    error
    job {
      name
      slug
      address
      salaryType
      salaryMax
      salaryMin
      description
      company {
        name
        logo
        foundedYear
        companySize
        averageAge
      }
      city {
        name
      }
      jobPosition {
        name
      }
      jobType {
        name
      }
      jobSector {
        name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobGQL extends Apollo.Query<JobQuery, JobQueryVariables> {
    document = JobDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FilterJobDocument = gql`
    query filterJob($input: SearchJobsInput!) {
  searchJobs(input: $input) {
    ok
    error
    totalPages
    totalResults
    jobs {
      slug
      name
      company {
        logo
        name
      }
      city {
        name
      }
      jobPosition {
        name
      }
      jobType {
        name
      }
      jobSector {
        name
      }
      updatedAt
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FilterJobGQL extends Apollo.Query<FilterJobQuery, FilterJobQueryVariables> {
    document = FilterJobDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface WatchQueryOptionsAlone<V>
    extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}
    
  interface QueryOptionsAlone<V>
    extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}
    
  interface MutationOptionsAlone<T, V>
    extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}
    
  interface SubscriptionOptionsAlone<V>
    extends Omit<ApolloCore.SubscriptionOptions<V>, 'query' | 'variables'> {}

  @Injectable({ providedIn: 'root' })
  export class ApolloAngularSDK {
    constructor(
      private citiesGql: CitiesGQL,
      private jobPositionsQueryGql: JobPositionsQueryGQL,
      private jobSectorsQueryGql: JobSectorsQueryGQL,
      private jobTypesQueryGql: JobTypesQueryGQL,
      private loginMutationGql: LoginMutationGQL,
      private createAccountGql: CreateAccountGQL,
      private appliedJobsGql: AppliedJobsGQL,
      private changePasswordGql: ChangePasswordGQL,
      private profileGql: ProfileGQL,
      private editProfileGql: EditProfileGQL,
      private resumeGql: ResumeGQL,
      private editAvatarGql: EditAvatarGQL,
      private editEducationGql: EditEducationGQL,
      private editExperienceGql: EditExperienceGQL,
      private editPortfolioGql: EditPortfolioGQL,
      private editExpertiseGql: EditExpertiseGQL,
      private editLanguageGql: EditLanguageGQL,
      private editAwardGql: EditAwardGQL,
      private companyGql: CompanyGQL,
      private filterCompanyGql: FilterCompanyGQL,
      private applyJobGql: ApplyJobGQL,
      private jobGql: JobGQL,
      private filterJobGql: FilterJobGQL
    ) {}
      
    cities(variables?: CitiesQueryVariables, options?: QueryOptionsAlone<CitiesQueryVariables>) {
      return this.citiesGql.fetch(variables, options)
    }
    
    citiesWatch(variables?: CitiesQueryVariables, options?: WatchQueryOptionsAlone<CitiesQueryVariables>) {
      return this.citiesGql.watch(variables, options)
    }
    
    jobPositionsQuery(variables?: JobPositionsQueryQueryVariables, options?: QueryOptionsAlone<JobPositionsQueryQueryVariables>) {
      return this.jobPositionsQueryGql.fetch(variables, options)
    }
    
    jobPositionsQueryWatch(variables?: JobPositionsQueryQueryVariables, options?: WatchQueryOptionsAlone<JobPositionsQueryQueryVariables>) {
      return this.jobPositionsQueryGql.watch(variables, options)
    }
    
    jobSectorsQuery(variables?: JobSectorsQueryQueryVariables, options?: QueryOptionsAlone<JobSectorsQueryQueryVariables>) {
      return this.jobSectorsQueryGql.fetch(variables, options)
    }
    
    jobSectorsQueryWatch(variables?: JobSectorsQueryQueryVariables, options?: WatchQueryOptionsAlone<JobSectorsQueryQueryVariables>) {
      return this.jobSectorsQueryGql.watch(variables, options)
    }
    
    jobTypesQuery(variables?: JobTypesQueryQueryVariables, options?: QueryOptionsAlone<JobTypesQueryQueryVariables>) {
      return this.jobTypesQueryGql.fetch(variables, options)
    }
    
    jobTypesQueryWatch(variables?: JobTypesQueryQueryVariables, options?: WatchQueryOptionsAlone<JobTypesQueryQueryVariables>) {
      return this.jobTypesQueryGql.watch(variables, options)
    }
    
    loginMutation(variables: LoginMutationMutationVariables, options?: MutationOptionsAlone<LoginMutationMutation, LoginMutationMutationVariables>) {
      return this.loginMutationGql.mutate(variables, options)
    }
    
    createAccount(variables: CreateAccountMutationVariables, options?: MutationOptionsAlone<CreateAccountMutation, CreateAccountMutationVariables>) {
      return this.createAccountGql.mutate(variables, options)
    }
    
    appliedJobs(variables: AppliedJobsQueryVariables, options?: QueryOptionsAlone<AppliedJobsQueryVariables>) {
      return this.appliedJobsGql.fetch(variables, options)
    }
    
    appliedJobsWatch(variables: AppliedJobsQueryVariables, options?: WatchQueryOptionsAlone<AppliedJobsQueryVariables>) {
      return this.appliedJobsGql.watch(variables, options)
    }
    
    changePassword(variables: ChangePasswordMutationVariables, options?: MutationOptionsAlone<ChangePasswordMutation, ChangePasswordMutationVariables>) {
      return this.changePasswordGql.mutate(variables, options)
    }
    
    profile(variables?: ProfileQueryVariables, options?: QueryOptionsAlone<ProfileQueryVariables>) {
      return this.profileGql.fetch(variables, options)
    }
    
    profileWatch(variables?: ProfileQueryVariables, options?: WatchQueryOptionsAlone<ProfileQueryVariables>) {
      return this.profileGql.watch(variables, options)
    }
    
    editProfile(variables: EditProfileMutationVariables, options?: MutationOptionsAlone<EditProfileMutation, EditProfileMutationVariables>) {
      return this.editProfileGql.mutate(variables, options)
    }
    
    resume(variables?: ResumeQueryVariables, options?: QueryOptionsAlone<ResumeQueryVariables>) {
      return this.resumeGql.fetch(variables, options)
    }
    
    resumeWatch(variables?: ResumeQueryVariables, options?: WatchQueryOptionsAlone<ResumeQueryVariables>) {
      return this.resumeGql.watch(variables, options)
    }
    
    editAvatar(variables: EditAvatarMutationVariables, options?: MutationOptionsAlone<EditAvatarMutation, EditAvatarMutationVariables>) {
      return this.editAvatarGql.mutate(variables, options)
    }
    
    editEducation(variables: EditEducationMutationVariables, options?: MutationOptionsAlone<EditEducationMutation, EditEducationMutationVariables>) {
      return this.editEducationGql.mutate(variables, options)
    }
    
    editExperience(variables: EditExperienceMutationVariables, options?: MutationOptionsAlone<EditExperienceMutation, EditExperienceMutationVariables>) {
      return this.editExperienceGql.mutate(variables, options)
    }
    
    editPortfolio(variables: EditPortfolioMutationVariables, options?: MutationOptionsAlone<EditPortfolioMutation, EditPortfolioMutationVariables>) {
      return this.editPortfolioGql.mutate(variables, options)
    }
    
    editExpertise(variables: EditExpertiseMutationVariables, options?: MutationOptionsAlone<EditExpertiseMutation, EditExpertiseMutationVariables>) {
      return this.editExpertiseGql.mutate(variables, options)
    }
    
    editLanguage(variables: EditLanguageMutationVariables, options?: MutationOptionsAlone<EditLanguageMutation, EditLanguageMutationVariables>) {
      return this.editLanguageGql.mutate(variables, options)
    }
    
    editAward(variables: EditAwardMutationVariables, options?: MutationOptionsAlone<EditAwardMutation, EditAwardMutationVariables>) {
      return this.editAwardGql.mutate(variables, options)
    }
    
    company(variables: CompanyQueryVariables, options?: QueryOptionsAlone<CompanyQueryVariables>) {
      return this.companyGql.fetch(variables, options)
    }
    
    companyWatch(variables: CompanyQueryVariables, options?: WatchQueryOptionsAlone<CompanyQueryVariables>) {
      return this.companyGql.watch(variables, options)
    }
    
    filterCompany(variables: FilterCompanyQueryVariables, options?: QueryOptionsAlone<FilterCompanyQueryVariables>) {
      return this.filterCompanyGql.fetch(variables, options)
    }
    
    filterCompanyWatch(variables: FilterCompanyQueryVariables, options?: WatchQueryOptionsAlone<FilterCompanyQueryVariables>) {
      return this.filterCompanyGql.watch(variables, options)
    }
    
    applyJob(variables: ApplyJobMutationVariables, options?: MutationOptionsAlone<ApplyJobMutation, ApplyJobMutationVariables>) {
      return this.applyJobGql.mutate(variables, options)
    }
    
    job(variables: JobQueryVariables, options?: QueryOptionsAlone<JobQueryVariables>) {
      return this.jobGql.fetch(variables, options)
    }
    
    jobWatch(variables: JobQueryVariables, options?: WatchQueryOptionsAlone<JobQueryVariables>) {
      return this.jobGql.watch(variables, options)
    }
    
    filterJob(variables: FilterJobQueryVariables, options?: QueryOptionsAlone<FilterJobQueryVariables>) {
      return this.filterJobGql.fetch(variables, options)
    }
    
    filterJobWatch(variables: FilterJobQueryVariables, options?: WatchQueryOptionsAlone<FilterJobQueryVariables>) {
      return this.filterJobGql.watch(variables, options)
    }
  }