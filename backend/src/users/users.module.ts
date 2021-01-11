import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { JobPosition } from '../jobs/entities/job-position.entity';
import { JobType } from '../jobs/entities/job-type.entity';
import { JobSector } from '../jobs/entities/job-sector.entity';
import { City } from '../cities/entities/city.entity';
import { Company } from '../companies/entities/company.entity';
import { Resume } from '../resumes/entities/resume.entity';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Verification,
      JobPosition,
      JobType,
      JobSector,
      City,
      Company,
      Resume,
    ]),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
