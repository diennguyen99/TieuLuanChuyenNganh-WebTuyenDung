import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resume } from './entities/resume.entity';
import { ResumeType } from './entities/resume-type.entity';
import { ResumeOpen } from './entities/resume-open.entity';
import { ResumesService } from './resumes.service';
import {
  ResumeOpensResolver,
  ResumesResolver,
  ResumeTypesResolver,
} from './resumes.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Resume, ResumeType, ResumeOpen])],
  providers: [
    ResumesService,
    ResumesResolver,
    ResumeTypesResolver,
    ResumeOpensResolver,
  ],
})
export class ResumesModule {}
