import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City } from '../cities/entities/city.entity';
import { JobType } from './entities/job-type.entity';
import { JobSector } from './entities/job-sector.entity';
import { Job } from './entities/job.entity';
import { Company } from '../companies/entities/company.entity';
import {
  CreateJobTypeInput,
  CreateJobTypeOutput,
} from './dtos/create-job-type.dto';
import {
  CreateJobSectorInput,
  CreateJobSectorOutput,
} from './dtos/create-job-sector.dto';
import { CreateJobInput, CreateJobOutput } from './dtos/create-job.dto';
import { JobTypesOutput } from './dtos/job-types.dto';
import { JobSectorsOutput } from './dtos/job-sectors.dto';
import { User, UserRole } from '../users/entities/user.entity';
import { JobPosition } from './entities/job-position.entity';
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
import { ERROR_MESSAGE } from '../common/common.constants';
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

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(City)
    private readonly cities: Repository<City>,
    @InjectRepository(JobPosition)
    private readonly jobPositionsService: Repository<JobPosition>,
    @InjectRepository(JobType)
    private readonly jobTypesService: Repository<JobType>,
    @InjectRepository(JobSector)
    private readonly jobSectorsService: Repository<JobSector>,
    @InjectRepository(Job)
    private readonly jobs: Repository<Job>,
    @InjectRepository(Company)
    private readonly companiesService: Repository<Company>,
  ) {}

  async createJobPosition(
    createJobPositionInput: CreateJobPositionInput,
  ): Promise<CreateJobPositionOutput> {
    try {
      const newJobPosition = this.jobPositionsService.create(
        createJobPositionInput,
      );
      const jobPosition = await this.jobPositionsService.save(newJobPosition);
      return {
        ok: true,
        id: jobPosition.id,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not create job position',
      };
    }
  }

  async editJobPosition({
    id,
    name,
  }: EditJobPositionInput): Promise<EditJobPositionOutput> {
    try {
      const jobPosition = await this.jobPositionsService.findOne({ id });
      jobPosition.name = name;
      if (!jobPosition) {
        return {
          ok: false,
          error: 'Job position not found',
        };
      }

      await this.jobPositionsService.save(jobPosition);

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async deleteJobPosition({
    id,
  }: DeleteJobPositionInput): Promise<DeleteJobPositionOutput> {
    try {
      const jobPosition = await this.jobPositionsService.findOne({ id });
      if (!jobPosition) {
        return {
          ok: false,
          error: 'Job position not found',
        };
      }

      await this.jobPositionsService.delete(id);

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async allJobPositions(): Promise<JobPositionsOutput> {
    try {
      const jobPositions = await this.jobPositionsService.find();
      return {
        ok: true,
        results: jobPositions,
      };
    } catch (e) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async adminAllJobPositions({
    page,
  }: AdminJobPositionsInput): Promise<AdminJobPositionsOutput> {
    try {
      const [
        jobPositions,
        totalResults,
      ] = await this.jobPositionsService.findAndCount({
        take: 5,
        skip: (page - 1) * 5,
      });

      return {
        ok: true,
        totalResults,
        totalPages: Math.ceil(totalResults / 5),
        jobPositions,
      };
    } catch {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async createJobType(
    createJobTypeInput: CreateJobTypeInput,
  ): Promise<CreateJobTypeOutput> {
    try {
      const newJobType = this.jobTypesService.create(createJobTypeInput);
      const jobType = await this.jobTypesService.save(newJobType);
      return {
        ok: true,
        id: jobType.id,
      };
    } catch (e) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async editJobType({
    id,
    name,
  }: EditJobTypeInput): Promise<EditJobTypeOutput> {
    try {
      const jobType = await this.jobTypesService.findOne({ id });
      if (!jobType) {
        return {
          ok: false,
          error: 'Job type not found',
        };
      }

      jobType.name = name;
      await this.jobTypesService.save(jobType);

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async deleteJobType({
    id,
  }: DeleteJobTypeInput): Promise<DeleteJobTypeOutput> {
    try {
      const jobType = await this.jobTypesService.findOne({ id });
      if (!jobType) {
        return {
          ok: false,
          error: 'Job type not found',
        };
      }

      await this.jobTypesService.delete(id);

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async allJobTypes(): Promise<JobTypesOutput> {
    try {
      const jobTypes = await this.jobTypesService.find();
      return {
        ok: true,
        results: jobTypes,
      };
    } catch (e) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async createJobSector(
    createJobSectorInput: CreateJobSectorInput,
  ): Promise<CreateJobSectorOutput> {
    try {
      const newJobSector = this.jobSectorsService.create(createJobSectorInput);
      const jobSector = await this.jobSectorsService.save(newJobSector);
      return {
        ok: true,
        id: jobSector.id,
      };
    } catch (e) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async editJobSector({
    id,
    name,
  }: EditJobSectorInput): Promise<EditJobSectorOutput> {
    try {
      const jobsSector = await this.jobSectorsService.findOne({ id });
      if (!jobsSector) {
        return {
          ok: false,
          error: 'Job sector not found',
        };
      }

      jobsSector.name = name;
      await this.jobSectorsService.save(jobsSector);

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async deleteJobSector({
    id,
  }: DeleteJobSectorInput): Promise<DeleteJobSectorOutput> {
    try {
      const jobsSector = await this.jobSectorsService.findOne({ id });
      if (!jobsSector) {
        return {
          ok: false,
          error: 'Job sector not found',
        };
      }

      await this.jobSectorsService.delete(id);

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async allJobSectors(): Promise<JobSectorsOutput> {
    try {
      const jobSectors = await this.jobSectorsService.find();
      return {
        ok: true,
        results: jobSectors,
      };
    } catch (e) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async adminAllJobSectors({
    page,
  }: AdminJobSectorsInput): Promise<AdminJobSectorsOutput> {
    try {
      const [
        jobSectors,
        totalResults,
      ] = await this.jobSectorsService.findAndCount({
        take: 5,
        skip: (page - 1) * 5,
      });
      return {
        ok: true,
        totalResults,
        totalPages: Math.ceil(totalResults / 5),
        jobSectors,
      };
    } catch (e) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async createJob(
    user: User,
    createJobInput: CreateJobInput,
  ): Promise<CreateJobOutput> {
    try {
      // Add City
      const city = await this.cities.findOne({
        slug: createJobInput.citySlug,
      });
      if (!city) {
        return {
          ok: false,
          error: 'City not found',
        };
      }

      // Add Job Position
      const jobPosition = await this.jobPositionsService.findOne({
        slug: createJobInput.jobPositionSlug,
      });
      if (!jobPosition) {
        return {
          ok: false,
          error: 'Job position not found',
        };
      }

      // Add Job Type
      const jobType = await this.jobTypesService.findOne({
        slug: createJobInput.jobTypeSlug,
      });
      if (!jobType) {
        return {
          ok: false,
          error: 'Job type not found',
        };
      }

      // Add Job Sector
      const jobSector = await this.jobSectorsService.findOne({
        slug: createJobInput.jobSectorSlug,
      });
      if (!jobSector) {
        return {
          ok: false,
          error: 'Job sector not found',
        };
      }

      const company = await this.companiesService.findOne({ id: user.id });
      if (!company) {
        return {
          ok: false,
          error: 'Company not found',
        };
      }

      const newJob = this.jobs.create(createJobInput);
      newJob.city = city;
      newJob.jobPosition = jobPosition;
      newJob.jobType = jobType;
      newJob.jobSector = jobSector;
      newJob.user = user;
      newJob.company = company;
      const job = await this.jobs.save(newJob);

      return {
        ok: true,
        jobId: job.id,
      };
    } catch (e) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async getJobByCandidate(
    user: User,
    { page }: JobsByCandidateInput,
  ): Promise<JobsByCandidateOutput> {
    try {
      const [jobs, totalResults] = await this.jobs.findAndCount({
        relations: ['city', 'jobPosition', 'jobType', 'jobSector'],
        where: {
          user,
        },
        order: {
          createdAt: 'DESC',
        },
        take: 2,
        skip: (page - 1) * 2,
      });

      return {
        ok: true,
        jobs,
        totalResults,
        totalPages: Math.ceil(totalResults / 2),
      };
    } catch {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async getJobById(user: User, { id }: JobInput): Promise<JobOutput> {
    try {
      const job = await this.jobs.findOne({
        relations: ['city', 'jobPosition', 'jobType', 'jobSector'],
        where: {
          id,
        },
      });

      if (!job) {
        return {
          ok: false,
          error: 'Job not found',
        };
      }

      if (user.id !== job.userId && user.role !== UserRole.Admin) {
        return {
          ok: false,
          error: `You can't view a job that you don't own`,
        };
      }
      return {
        ok: true,
        job,
      };
    } catch {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async getJobBySlug({ slug }: JobClientInput): Promise<JobClientOutput> {
    try {
      const job = await this.jobs.findOne({
        relations: ['company', 'city', 'jobPosition', 'jobType', 'jobSector'],
        where: {
          slug,
        },
      });

      if (!job) {
        return {
          ok: false,
          error: 'Job not found',
        };
      }

      return {
        ok: true,
        job,
      };
    } catch {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async editJobById(
    user: User,
    editJobInput: EditJobInput,
  ): Promise<EditJobOutput> {
    try {
      const job = await this.jobs.findOne({ id: editJobInput.id });

      if (!job) {
        return {
          ok: false,
          error: 'Job not found',
        };
      }

      if (job.userId !== user.id) {
        return {
          ok: false,
          error: `You can't edit a job that you don't own`,
        };
      }

      // Add City
      const city = await this.cities.findOne({
        slug: editJobInput.citySlug,
      });
      if (!city) {
        return {
          ok: false,
          error: 'City not found',
        };
      }

      // Add Job Position
      const jobPosition = await this.jobPositionsService.findOne({
        slug: editJobInput.jobPositionSlug,
      });
      if (!jobPosition) {
        return {
          ok: false,
          error: 'Job position not found',
        };
      }

      // Add Job Type
      const jobType = await this.jobTypesService.findOne({
        slug: editJobInput.jobTypeSlug,
      });
      if (!jobType) {
        return {
          ok: false,
          error: 'Job type not found',
        };
      }

      // Add Job Sector
      const jobSector = await this.jobSectorsService.findOne({
        slug: editJobInput.jobSectorSlug,
      });
      if (!jobSector) {
        return {
          ok: false,
          error: 'Job sector not found',
        };
      }

      job.name = editJobInput.name;
      job.salaryType = editJobInput.salaryType;
      job.salaryMin = editJobInput.salaryMin;
      job.salaryMax = editJobInput.salaryMax;
      job.address = editJobInput.address;
      if (job.description !== editJobInput.description) {
        job.description = editJobInput.description;
      }
      job.city = city;
      job.jobPosition = jobPosition;
      job.jobType = jobType;
      job.jobSector = jobSector;
      job.user = user;
      await this.jobs.save(job);

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async deleteJob(
    user: User,
    { id }: DeleteJobInput,
  ): Promise<DeleteJobOutput> {
    try {
      const job = await this.jobs.findOne({ id });

      if (!job) {
        return {
          ok: false,
          error: 'Job not found',
        };
      }

      if (user.id !== job.userId && user.role !== UserRole.Admin) {
        return {
          ok: false,
          error: `You can't delete a job that you don't own`,
        };
      }

      await this.jobs.delete(id);

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }
}
