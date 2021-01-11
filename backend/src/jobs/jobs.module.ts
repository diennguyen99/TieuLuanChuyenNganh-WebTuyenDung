import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosition } from './entities/job-position.entity';
import { JobType } from './entities/job-type.entity';
import { JobSector } from './entities/job-sector.entity';
import { Job } from './entities/job.entity';
import { City } from '../cities/entities/city.entity';
import { Company } from '../companies/entities/company.entity';
import { JobsService } from './jobs.service';
import {
  JobPositionsResolver,
  JobSectorsResolver,
  JobsResolver,
  JobTypesResolver,
} from './jobs.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([City, JobPosition, JobType, JobSector, Job, Company]),
  ],
  providers: [
    JobsService,
    JobPositionsResolver,
    JobTypesResolver,
    JobSectorsResolver,
    JobsResolver,
  ],
})
export class JobsModule {}
