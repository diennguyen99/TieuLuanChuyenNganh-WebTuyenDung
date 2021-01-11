import { JobPosition } from '../../core/models/job-position.model';
import { JobType } from '../../core/models/job-type.model';
import { JobSector } from '../../core/models/job-sector.model';
import { City } from '../../core/models/city.model';

export interface SearchCampaign {
  id: number;
  name: string;
  skills: string[];
  jobPosition: JobPosition;
  jobType: JobType;
  jobSector: JobSector;
  city: City;
  createdAt: Date;
  updatedAt: Date;
}
