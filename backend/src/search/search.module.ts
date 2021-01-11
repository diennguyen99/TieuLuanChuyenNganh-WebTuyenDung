import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SearchCampaign } from './entities/ search-campaign.entity';
import { JobPosition } from '../jobs/entities/job-position.entity';
import { JobType } from '../jobs/entities/job-type.entity';
import { JobSector } from '../jobs/entities/job-sector.entity';
import { City } from '../cities/entities/city.entity';
import { Resume } from '../resumes/entities/resume.entity';
import { Job } from '../jobs/entities/job.entity';
import { Company } from '../companies/entities/company.entity';

import { SearchService } from './search.service';
import { SearchCampaignResolver } from './search.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SearchCampaign,
      JobPosition,
      JobType,
      JobSector,
      City,
      Resume,
      Job,
      Company
    ]),
  ],
  providers: [SearchService, SearchCampaignResolver],
})
export class SearchModule {}
