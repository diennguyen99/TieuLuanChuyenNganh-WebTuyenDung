import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Company } from './entities/company.entity';
import { CompaniesService } from './companies.service';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { EditCompanyInput, EditCompanyOutput } from './dtos/edit-company.dto';
import { CompanyInput, CompanyOutput } from './dtos/company.dto';
import { EditLogoInput, EditLogoOutput } from './dtos/edit-logo.dto';
import {
  EditThumbnailInput,
  EditThumbnailOutput,
} from './dtos/edit-thumbnail.dto';
import { CompanyBySlugInput } from './dtos/company-by-slug.dto';

@Resolver((of) => Company)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Mutation((returns) => EditCompanyOutput)
  async editCompany(
    @AuthUser() user: User,
    @Args('input') editCompanyInput: EditCompanyInput,
  ): Promise<EditCompanyOutput> {
    return await this.companiesService.editCompany(user, editCompanyInput);
  }

  @Query((returns) => CompanyOutput)
  async company(
    @Args('input') companyInput: CompanyInput,
  ): Promise<CompanyOutput> {
    return await this.companiesService.getCompany(companyInput);
  }

  @Query((returns) => CompanyOutput)
  async companyByEmployer(@AuthUser() user: User): Promise<CompanyOutput> {
    return await this.companiesService.getCompanyByEmployer(user);
  }

  @Mutation((returns) => EditLogoOutput)
  async editLogoCompany(
    @AuthUser() user: User,
    @Args('input') editLogoInput: EditLogoInput,
  ): Promise<EditLogoOutput> {
    return await this.companiesService.editLogo(user, editLogoInput);
  }

  @Mutation((returns) => EditThumbnailOutput)
  async editThumbnailCompany(
    @AuthUser() user: User,
    @Args('input') editThumbnailInput: EditThumbnailInput,
  ): Promise<EditThumbnailOutput> {
    return await this.companiesService.editThumbnail(user, editThumbnailInput);
  }

  @Query((returns) => CompanyOutput)
  async companyBySlug(
    @Args('input') companyBySlugInput: CompanyBySlugInput,
  ): Promise<CompanyOutput> {
    return await this.companiesService.getCompanyBySlug(companyBySlugInput);
  }
}
