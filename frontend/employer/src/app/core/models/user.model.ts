import { City } from './city.model';
import { JobType } from './job-type.model';
import { JobSector } from './job-sector.model';

enum UserRole {
  Candidate= 'Candidate',
  Employer= 'Employer',
  Admin= 'Admin'
}

enum UserSex {
  Male= 'Male',
  Female= 'Female'
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  sex: UserSex;
  birthDay: Date;
  address: string;
  description: string;
  jobType: JobType;
  jobSector: JobSector;
  verified: boolean;
  city: City;
  createdAt: Date;
  updatedAt: Date;
}
