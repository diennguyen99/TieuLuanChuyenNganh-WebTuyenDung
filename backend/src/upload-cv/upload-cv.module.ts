import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppliedJob } from './entities/applied-job.entity';
import { Resume } from '../resumes/entities/resume.entity';
import { Job } from '../jobs/entities/job.entity';
import { UploadCvService } from './upload-cv.service';
import { UploadCvResolver } from './upload-cv.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([AppliedJob, Resume, Job])],
  providers: [UploadCvService, UploadCvResolver],
})
export class UploadCvModule {}
