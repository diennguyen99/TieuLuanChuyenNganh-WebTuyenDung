import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JobType } from './entities/job-type.entity';
import { JobsService } from './jobs.service';
import {
  CreateJobTypeInput,
  CreateJobTypeOutput,
} from './dtos/create-job-type.dto';
import { JobSector } from './entities/job-sector.entity';
import {
  CreateJobSectorInput,
  CreateJobSectorOutput,
} from './dtos/create-job-sector.dto';
import { Job } from './entities/job.entity';
import { CreateJobInput, CreateJobOutput } from './dtos/create-job.dto';
import { JobTypesOutput } from './dtos/job-types.dto';
import { JobSectorsOutput } from './dtos/job-sectors.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import {
  CreateJobPositionInput,
  CreateJobPositionOutput,
} from './dtos/create-job-position.dto';
import { JobPositionsOutput } from './dtos/job-positions.dto';
import {
  JobsByCandidateInput,
  JobsByCandidateOutput,
} from './dtos/jobs-by-candidate.dto';
import { JobInput, JobOutput } from './dtos/job.dto';
import { EditJobInput, EditJobOutput } from './dtos/edit-job.dto';
import { DeleteJobInput, DeleteJobOutput } from './dtos/delete-job.dto';
import { JobClientInput, JobClientOutput } from './dtos/job-client.dto';
import {
  EditJobPositionInput,
  EditJobPositionOutput,
} from './dtos/edit-job-position.dto';
import {
  DeleteJobPositionInput,
  DeleteJobPositionOutput,
} from './dtos/delete-job-position.dto';
import {
  AdminJobPositionsInput,
  AdminJobPositionsOutput,
} from './dtos/admin-job-positions.dto';
import { EditJobTypeInput, EditJobTypeOutput } from './dtos/edit-job-type.dto';
import {
  DeleteJobTypeInput,
  DeleteJobTypeOutput,
} from './dtos/delete-job-type.dto';
import {
  EditJobSectorInput,
  EditJobSectorOutput,
} from './dtos/edit-job-sector.dto';
import {
  DeleteJobSectorInput,
  DeleteJobSectorOutput,
} from './dtos/delete-job-sector.dto';
import {
  AdminJobSectorsInput,
  AdminJobSectorsOutput,
} from './dtos/admin-job-sectors.dto';

@Resolver((of) => JobType)
export class JobPositionsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Mutation((returns) => CreateJobPositionOutput)
  async createJobPosition(
    @Args('input') createJobPositionInput: CreateJobPositionInput,
  ): Promise<CreateJobPositionOutput> {
    return await this.jobsService.createJobPosition(createJobPositionInput);
  }

  @Mutation((returns) => EditJobPositionOutput)
  async editJobPosition(
    @Args('input') editJobPositionInput: EditJobPositionInput,
  ): Promise<EditJobPositionOutput> {
    return await this.jobsService.editJobPosition(editJobPositionInput);
  }

  @Mutation((returns) => DeleteJobPositionOutput)
  async deleteJobPosition(
    @Args('input') deleteJobPositionInput: DeleteJobPositionInput,
  ): Promise<DeleteJobPositionOutput> {
    return await this.jobsService.deleteJobPosition(deleteJobPositionInput);
  }

  @Query((returns) => JobPositionsOutput)
  async jobPositions(): Promise<JobPositionsOutput> {
    return await this.jobsService.allJobPositions();
  }

  @Query((returns) => AdminJobPositionsOutput)
  async adminJobPositions(
    @Args('input') adminJobPositionsInput: AdminJobPositionsInput,
  ): Promise<AdminJobPositionsOutput> {
    return await this.jobsService.adminAllJobPositions(adminJobPositionsInput);
  }
}

@Resolver((of) => JobType)
export class JobTypesResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Mutation((returns) => CreateJobTypeOutput)
  async createJobType(
    @Args('input') createJobTypeInput: CreateJobTypeInput,
  ): Promise<CreateJobTypeOutput> {
    return await this.jobsService.createJobType(createJobTypeInput);
  }

  @Mutation((returns) => EditJobTypeOutput)
  async editJobType(
    @Args('input') editJobTypeInput: EditJobTypeInput,
  ): Promise<EditJobTypeOutput> {
    return await this.jobsService.editJobType(editJobTypeInput);
  }

  @Mutation((returns) => DeleteJobTypeOutput)
  async deleteJobType(
    @Args('input') deleteJobTypeInput: DeleteJobTypeInput,
  ): Promise<DeleteJobTypeOutput> {
    return await this.jobsService.deleteJobType(deleteJobTypeInput);
  }

  @Query((returns) => JobTypesOutput)
  async jobTypes(): Promise<JobTypesOutput> {
    return await this.jobsService.allJobTypes();
  }
}

@Resolver((of) => JobSector)
export class JobSectorsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Mutation((returns) => CreateJobSectorOutput)
  async createJobSector(
    @Args('input') createJobSectorInput: CreateJobSectorInput,
  ): Promise<CreateJobSectorOutput> {
    return await this.jobsService.createJobSector(createJobSectorInput);
  }

  @Mutation((returns) => EditJobSectorOutput)
  async editJobSector(
    @Args('input') editJobSectorInput: EditJobSectorInput,
  ): Promise<EditJobSectorOutput> {
    return await this.jobsService.editJobSector(editJobSectorInput);
  }

  @Mutation((returns) => DeleteJobSectorOutput)
  async deleteJobSector(
    @Args('input') deleteJobSectorInput: DeleteJobSectorInput,
  ): Promise<DeleteJobSectorOutput> {
    return await this.jobsService.deleteJobSector(deleteJobSectorInput);
  }

  @Query((returns) => JobSectorsOutput)
  async jobSectors(): Promise<JobSectorsOutput> {
    return await this.jobsService.allJobSectors();
  }

  @Query((returns) => AdminJobSectorsOutput)
  async adminJobSectors(
    @Args('input') adminJobSectorsInput: AdminJobSectorsInput,
  ): Promise<AdminJobSectorsOutput> {
    return await this.jobsService.adminAllJobSectors(adminJobSectorsInput);
  }
}

@Resolver((of) => Job)
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Mutation((returns) => CreateJobOutput)
  async createJob(
    @AuthUser() user: User,
    @Args('input') createJobInput: CreateJobInput,
  ): Promise<CreateJobOutput> {
    return await this.jobsService.createJob(user, createJobInput);
  }

  @Query((returns) => JobsByCandidateOutput)
  async jobsByCandidate(
    @AuthUser() user: User,
    @Args('input') jobsByCandidateInput: JobsByCandidateInput,
  ): Promise<JobsByCandidateOutput> {
    return await this.jobsService.getJobByCandidate(user, jobsByCandidateInput);
  }

  @Query((returns) => JobOutput)
  async job(
    @AuthUser() user: User,
    @Args('input') jobInput: JobInput,
  ): Promise<JobOutput> {
    return await this.jobsService.getJobById(user, jobInput);
  }

  @Query((returns) => JobClientOutput)
  async jobBySlug(
    @Args('input') jobClientInput: JobClientInput,
  ): Promise<JobClientOutput> {
    return await this.jobsService.getJobBySlug(jobClientInput);
  }

  @Mutation((returns) => EditJobOutput)
  async editJob(
    @AuthUser() user: User,
    @Args('input') editJobInput: EditJobInput,
  ): Promise<EditJobOutput> {
    return await this.jobsService.editJobById(user, editJobInput);
  }

  @Mutation((returns) => DeleteJobOutput)
  async deleteJob(
    @AuthUser() user: User,
    @Args('input') deleteJobInput: DeleteJobInput,
  ): Promise<DeleteJobOutput> {
    return await this.jobsService.deleteJob(user, deleteJobInput);
  }
}
