import {JobPosition} from '../../core/models/job-position.model';
import {JobSector} from '../../core/models/job-sector.model';
import {JobType} from '../../core/models/job-type.model';
import {City} from '../../core/models/city.model';

enum SalaryType {
  Monthly = 'Monthly',
  Weekly = 'Weekly',
  Hourly = 'Hourly',
  Negotiable = 'Negotiable'
}

export interface Job {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  address: string;
  salaryType: SalaryType;
  salaryMax: number;
  salaryMin: number;
  description: string;
  jobPosition: JobPosition;
  jobSector: JobSector;
  jobType: JobType;
  city: City;
  promotedUntil: Date;
}
