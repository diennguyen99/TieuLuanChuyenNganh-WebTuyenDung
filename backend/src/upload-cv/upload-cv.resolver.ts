import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { UploadCvInput, UploadCvOutput } from './dtos/upload-cv.dto';
import { UploadCvService } from './upload-cv.service';
import { AppliedJobsInput, AppliedJobsOutput } from './dtos/applied-jobs.dto';

@Resolver((of) => UploadCvOutput)
export class UploadCvResolver {
  constructor(private readonly uploadCvService: UploadCvService) {}

  @Mutation((type) => UploadCvOutput)
  async uploadCv(
    @AuthUser() user: User,
    @Args('input') uploadCvInput: UploadCvInput,
  ): Promise<UploadCvOutput> {
    return this.uploadCvService.uploadCv(user, uploadCvInput);
  }

  @Query((type) => AppliedJobsOutput)
  async getCandidatesApply(
    @AuthUser() user: User,
    @Args('input') appliedJobsInput: AppliedJobsInput,
  ): Promise<AppliedJobsOutput> {
    return this.uploadCvService.getCandidatesApply(user, appliedJobsInput);
  }

  @Query((type) => AppliedJobsOutput)
  async getAppliedJobs(
    @AuthUser() user: User,
    @Args('input') appliedJobsInput: AppliedJobsInput,
  ): Promise<AppliedJobsOutput> {
    return this.uploadCvService.getAppliedJob(user, appliedJobsInput);
  }
}
