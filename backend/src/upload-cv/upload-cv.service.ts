import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UploadCvInput, UploadCvOutput } from './dtos/upload-cv.dto';
import { User } from '../users/entities/user.entity';
import { AppliedJob } from './entities/applied-job.entity';
import { Resume } from '../resumes/entities/resume.entity';
import { Job } from '../jobs/entities/job.entity';
import { AppliedJobsInput, AppliedJobsOutput } from './dtos/applied-jobs.dto';

@Injectable()
export class UploadCvService {
  constructor(
    @InjectRepository(AppliedJob)
    private readonly appliedJobService: Repository<AppliedJob>,
    @InjectRepository(Resume)
    private readonly resumesService: Repository<Resume>,
    @InjectRepository(Job)
    private readonly jobsService: Repository<Job>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async uploadCv(
    user: User,
    { name, email, content, jobSlug, file, myCvOnline }: UploadCvInput,
  ): Promise<UploadCvOutput> {
    try {
      const job = await this.jobsService.findOne({
        where: {
          slug: jobSlug,
        },
      });

      const appliedJob = this.appliedJobService.create({
        name,
        email,
        content,
        job,
      });

      if (!user) {
        appliedJob.cvUpload = await this.cloudinaryService.uploadCV(file);
      } else {
        appliedJob.user = user;
        if (myCvOnline) {
          appliedJob.cvOnline = await this.resumesService.findOne({
            where: {
              user: user.id,
            },
          });
        } else {
          appliedJob.cvUpload = await this.cloudinaryService.uploadCV(file);
        }
      }

      await this.appliedJobService.save(appliedJob);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getCandidatesApply(
    user: User,
    { page }: AppliedJobsInput,
  ): Promise<AppliedJobsOutput> {
    try {
      const [appliedJobs, totalResults] = await getConnection()
        .getRepository(AppliedJob)
        .createQueryBuilder('a')
        .innerJoinAndSelect('a.job', 'job')
        .innerJoinAndSelect('a.cvOnline', 'resume')
        .where(`job."userId" = '${user.id}'`)
        .take(100)
        .skip((page - 1) * 100)
        .getManyAndCount();

      return {
        ok: true,
        totalResults,
        totalPages: Math.ceil(totalResults / 100),
        appliedJobs,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getAppliedJob(
    user: User,
    { page }: AppliedJobsInput,
  ): Promise<AppliedJobsOutput> {
    try {
      const [
        appliedJobs,
        totalResults,
      ] = await this.appliedJobService.findAndCount({
        relations: ['job', 'cvOnline'],
        take: 5,
        skip: (page - 1) * 5,
        order: {
          createdAt: 'DESC'
        }
      });

      return {
        ok: true,
        totalResults,
        totalPages: Math.ceil(totalResults / 5),
        appliedJobs,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
