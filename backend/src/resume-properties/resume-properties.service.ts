import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Repository } from 'typeorm';
import {
  CreateSchoolInput,
  CreateSchoolOutput,
} from './dtos/create-school.dto';
import { ERROR_MESSAGE } from '../common/common.constants';
import { EditSchoolInput, EditSchoolOutput } from './dtos/edit-school.dto';
import {
  DeleteSchoolInput,
  DeleteSchoolOutput,
} from './dtos/delete-school.dto';
import { SchoolsOutput } from './dtos/schools.dto';
import {
  AdminSchoolsInput,
  AdminSchoolsOutput,
} from './dtos/admin-schools.dto';

@Injectable()
export class ResumePropertiesService {
  constructor(
    @InjectRepository(School)
    private readonly schoolService: Repository<School>,
  ) {}

  async createSchool(
    createSchoolInput: CreateSchoolInput,
  ): Promise<CreateSchoolOutput> {
    try {
      const newSchool = this.schoolService.create(createSchoolInput);
      const school = await this.schoolService.save(newSchool);

      return {
        ok: true,
        id: school.id,
      };
    } catch {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async editSchool({
    id,
    name,
    subName,
  }: EditSchoolInput): Promise<EditSchoolOutput> {
    try {
      const school = await this.schoolService.findOne({ id });
      if (!school) {
        return {
          ok: false,
          error: 'School not found',
        };
      }

      school.name = name;
      school.subName = subName;
      await this.schoolService.save(school);

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

  async deleteSchool({ id }: DeleteSchoolInput): Promise<DeleteSchoolOutput> {
    try {
      const school = await this.schoolService.findOne({ id });
      if (!school) {
        return {
          ok: false,
          error: 'School not found',
        };
      }

      await this.schoolService.delete(school);

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

  async getSchools(): Promise<SchoolsOutput> {
    try {
      const schools = await this.schoolService.find({
        order: {
          name: 'ASC',
        },
      });
      return {
        ok: true,
        schools,
      };
    } catch {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async adminGetSchools({
    page,
  }: AdminSchoolsInput): Promise<AdminSchoolsOutput> {
    try {
      const [schools, totalResults] = await this.schoolService.findAndCount({
        take: 10,
        skip: (page - 1) * 10,
        order: {
          name: 'ASC',
        },
      });
      return {
        ok: true,
        totalResults,
        totalPages: Math.ceil(totalResults / 10),
        schools,
      };
    } catch {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }
}
