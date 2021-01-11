import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Raw, Repository } from 'typeorm';

import { SearchCampaign } from './entities/ search-campaign.entity';
import { Resume } from '../resumes/entities/resume.entity';
import { User } from '../users/entities/user.entity';
import {
  SearchResumesInput,
  SearchResumesOutput,
} from './dtos/search-resume.dto';
import {
  CreateSearchCampaignResumeInput,
  CreateSearchCampaignResumeOutput,
} from './dtos/create-search-campaign-resume.dto';
import { JobType } from '../jobs/entities/job-type.entity';
import { JobSector } from '../jobs/entities/job-sector.entity';
import { City } from '../cities/entities/city.entity';
import { Job } from '../jobs/entities/job.entity';
import { Company } from '../companies/entities/company.entity';
import {
  ListSearchCampaignInput,
  ListSearchCampaignOutput,
} from './dtos/list-search-campaign.dto';
import { JobPosition } from '../jobs/entities/job-position.entity';
import {
  EditSearchCampaignResumeInput,
  EditSearchCampaignResumeOutput,
} from './dtos/edit-search-campaign-resume.dto';
import {
  DeleteSearchCampaignResumeInput,
  DeleteSearchCampaignResumeOutput,
} from './dtos/delete-search-campaign-resume.dto';
import { SearchJobsInput, SearchJobsOutput } from './dtos/search-jobs.dto';
import {
  SearchCompaniesInput,
  SearchCompaniesOutput,
} from './dtos/search-companies.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchCampaign)
    private readonly searchCampaign: Repository<SearchCampaign>,
    @InjectRepository(Resume)
    private readonly resumes: Repository<Resume>,
    @InjectRepository(JobPosition)
    private readonly jobPositions: Repository<JobPosition>,
    @InjectRepository(JobType)
    private readonly jobTypes: Repository<JobType>,
    @InjectRepository(JobSector)
    private readonly jobSectors: Repository<JobSector>,
    @InjectRepository(City)
    private readonly cities: Repository<City>,
    @InjectRepository(Job)
    private readonly jobsService: Repository<Job>,
    @InjectRepository(Company)
    private readonly companiesService: Repository<Company>,
  ) {}

  async createSearchCampaignResume(
    user: User,
    {
      name,
      skills,
      jobPositionSlug,
      jobTypeSlug,
      jobSectorSlug,
      citySlug,
    }: CreateSearchCampaignResumeInput,
  ): Promise<CreateSearchCampaignResumeOutput> {
    try {
      const jobPosition = await this.jobPositions.findOne({
        slug: jobPositionSlug,
      });
      if (!jobPosition) {
        return {
          ok: false,
          error: 'Job Position not found',
        };
      }

      const jobType = await this.jobTypes.findOne({
        slug: jobTypeSlug,
      });
      if (!jobType) {
        return {
          ok: false,
          error: 'Job Type not found',
        };
      }

      const jobSector = await this.jobSectors.findOne({
        slug: jobSectorSlug,
      });
      if (!jobSector) {
        return {
          ok: false,
          error: 'Job Type not found',
        };
      }

      const city = await this.cities.findOne({
        slug: citySlug,
      });
      if (!city) {
        return {
          ok: false,
          error: 'City not found',
        };
      }

      const newSearchCampaign = this.searchCampaign.create({
        name,
        skills,
      });

      newSearchCampaign.jobPosition = jobPosition;
      newSearchCampaign.jobType = jobType;
      newSearchCampaign.jobSector = jobSector;
      newSearchCampaign.city = city;
      newSearchCampaign.user = user;

      await this.searchCampaign.save(newSearchCampaign);

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

  async editSearchCampaignResume(
    user: User,
    {
      id,
      name,
      skills,
      jobPositionSlug,
      jobTypeSlug,
      jobSectorSlug,
      citySlug,
    }: EditSearchCampaignResumeInput,
  ): Promise<EditSearchCampaignResumeOutput> {
    try {
      const searchCampaign = await this.searchCampaign.findOne({
        relations: ['user'],
        where: {
          id,
          user: user.id,
        },
      });
      if (!searchCampaign) {
        return {
          ok: false,
          error: 'Search Campaign not found',
        };
      }

      const jobPosition = await this.jobPositions.findOne({
        slug: jobPositionSlug,
      });
      if (!jobPosition) {
        return {
          ok: false,
          error: 'Job Position not found',
        };
      }

      const jobType = await this.jobTypes.findOne({
        slug: jobTypeSlug,
      });
      if (!jobType) {
        return {
          ok: false,
          error: 'Job Type not found',
        };
      }

      const jobSector = await this.jobSectors.findOne({
        slug: jobSectorSlug,
      });
      if (!jobSector) {
        return {
          ok: false,
          error: 'Job Type not found',
        };
      }

      const city = await this.cities.findOne({
        slug: citySlug,
      });
      if (!city) {
        return {
          ok: false,
          error: 'City not found',
        };
      }

      searchCampaign.name = name;
      searchCampaign.skills = skills;
      searchCampaign.jobPosition = jobPosition;
      searchCampaign.jobType = jobType;
      searchCampaign.jobSector = jobSector;
      searchCampaign.city = city;

      await this.searchCampaign.save(searchCampaign);

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

  async deleteSearchCampaignResume(
    user: User,
    { id }: DeleteSearchCampaignResumeInput,
  ): Promise<DeleteSearchCampaignResumeOutput> {
    try {
      const searchCampaign = await this.searchCampaign.findOne({
        relations: ['user'],
        where: {
          id,
          user: user.id,
        },
      });

      if (!searchCampaign) {
        return {
          ok: false,
          error: 'Search Campaign not found',
        };
      }

      await this.searchCampaign.delete(id);

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not delete Search Campaign',
      };
    }
  }

  async listSearchCampaignResume(
    user: User,
    { page }: ListSearchCampaignInput,
  ): Promise<ListSearchCampaignOutput> {
    try {
      console.log(user);
      const [
        listSearchCampaign,
        totalResults,
      ] = await this.searchCampaign.findAndCount({
        relations: ['jobPosition', 'jobType', 'jobSector', 'city'],
        where: { user: user.id },
        take: 2,
        skip: (page - 1) * 2,
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        ok: true,
        listSearchCampaign,
        totalResults,
        totalPages: Math.ceil(totalResults / 2),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async searchResume(
    user: User,
    { id, page }: SearchResumesInput,
  ): Promise<SearchResumesOutput> {
    try {
      const searchCampaign = await this.searchCampaign.findOne(id, {
        relations: ['jobPosition', 'jobType', 'jobSector', 'city'],
      });

      if (!searchCampaign) {
        return {
          ok: false,
          error: 'Search Campaign not found',
        };
      }
      if (searchCampaign.userId !== user.id) {
        return {
          ok: false,
          error: 'Search Campaign not found',
        };
      }

      const [resumes, totalResults] = await getConnection()
        .getRepository(Resume)
        .createQueryBuilder('r')
        .innerJoinAndSelect('r.user', 'u')
        .innerJoinAndSelect('u.city', 'c')
        .leftJoinAndSelect('r.resumeOpen', 'ro')
        .where(`ro."userId" IS NULL`)
        .andWhere(`u."jobTypeId" = ${searchCampaign.jobTypeId}`)
        .andWhere(`u."jobSectorId" = ${searchCampaign.jobSectorId}`)
        .andWhere(`u."cityId" = ${searchCampaign.cityId}`)
        .andWhere(
          `to_tsvector(r."skills") @@ to_tsquery('${searchCampaign.skills}')`,
        )
        .take(2)
        .skip((page - 1) * 2)
        .getManyAndCount();

      return {
        ok: true,
        searchCampaign,
        resumes,
        totalResults,
        totalPages: Math.ceil(totalResults / 2),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async searchJobs({
    page,
    name,
    citySlug,
    jobSectorSlug,
    jobTypeSlug,
  }: SearchJobsInput): Promise<SearchJobsOutput> {
    try {
      const jobsQuery = getConnection()
        .getRepository(Job)
        .createQueryBuilder('j')
        .innerJoinAndSelect('j.company', 'company')
        .innerJoinAndSelect('j.city', 'c')
        .innerJoinAndSelect('j.jobPosition', 'jp')
        .innerJoinAndSelect('j.jobSector', 'js')
        .innerJoinAndSelect('j.jobType', 'jt');

      if (citySlug) {
        jobsQuery.andWhere(`c."slug" = '${citySlug}'`);
      }

      if (jobSectorSlug) {
        jobsQuery.andWhere(`js."slug" = '${jobSectorSlug}'`);
      }

      if (jobTypeSlug) {
        jobsQuery.andWhere(`jt."slug" = '${jobTypeSlug}'`);
      }

      if (name) {
        jobsQuery.andWhere(`to_tsvector(j."name") @@ to_tsquery('${name}')`);
      }

      const [jobs, totalResults] = await jobsQuery
        .take(2)
        .skip((page - 1) * 2)
        .orderBy('j.updatedAt', 'DESC')
        .getManyAndCount();

      return {
        ok: true,
        jobs,
        totalResults,
        totalPages: Math.ceil(totalResults / 2),
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load jobs',
      };
    }
  }

  async searchCompanies({
    page,
    nameCompany,
  }: SearchCompaniesInput): Promise<SearchCompaniesOutput> {
    try {
      const [
        companies,
        totalResults,
      ] = await this.companiesService.findAndCount({
        relations: ['city', 'jobs'],
        where: {
          name: Raw((name) => `${name} ILIKE '%${nameCompany}%'`),
        },
        take: 6,
        skip: (page - 1) * 6,
        order: {
          name: 'ASC',
        },
      });

      return {
        ok: true,
        companies,
        totalResults,
        totalPages: Math.ceil(totalResults / 6),
      };
    } catch {
      return {
        ok: false,
        error: 'Load companies error!',
      };
    }
  }
}
