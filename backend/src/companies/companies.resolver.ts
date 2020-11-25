import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Company } from './entities/company.entity';
import { CompaniesService } from './companies.service';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import {
  CreateCompanyInput,
  CreateCompanyOutput,
} from './dtos/create-company.dto';

@Resolver((of) => Company)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Mutation((returns) => CreateCompanyOutput)
  async createCompany(
    @AuthUser() employer: User,
    @Args('input') createCompanyInput: CreateCompanyInput,
  ): Promise<CreateCompanyOutput> {
    return await this.companiesService.createCompany(
      employer,
      createCompanyInput,
    );
  }
}
