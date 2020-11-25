import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  CreateCompanyInput,
  CreateCompanyOutput,
} from './dtos/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companies: Repository<Company>,
  ) {}

  async createCompany(
    employer: User,
    createCompanyInput: CreateCompanyInput,
  ): Promise<CreateCompanyOutput> {
    try {
      const newCompany = this.companies.create(createCompanyInput);
      newCompany.user = employer;

      await this.companies.save(newCompany);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not create company',
      };
    }
  }
}
