import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SearchCampaign } from './entities/ search-campaign.entity';
import { SearchService } from './search.service';
import {
  SearchResumesInput,
  SearchResumesOutput,
} from './dtos/search-resume.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import {
  CreateSearchCampaignResumeInput,
  CreateSearchCampaignResumeOutput,
} from './dtos/create-search-campaign-resume.dto';
import {
  ListSearchCampaignInput,
  ListSearchCampaignOutput,
} from './dtos/list-search-campaign.dto';
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

@Resolver((of) => SearchCampaign)
export class SearchCampaignResolver {
  constructor(private readonly searchService: SearchService) {}

  @Mutation((returns) => CreateSearchCampaignResumeOutput)
  async createSearchCampaignResume(
    @AuthUser() user: User,
    @Args('input')
    createSearchCampaignResumeInput: CreateSearchCampaignResumeInput,
  ): Promise<CreateSearchCampaignResumeOutput> {
    return this.searchService.createSearchCampaignResume(
      user,
      createSearchCampaignResumeInput,
    );
  }

  @Mutation((returns) => EditSearchCampaignResumeOutput)
  async editSearchCampaignResume(
    @AuthUser() user: User,
    @Args('input')
    editSearchCampaignResumeInput: EditSearchCampaignResumeInput,
  ): Promise<EditSearchCampaignResumeOutput> {
    return this.searchService.editSearchCampaignResume(
      user,
      editSearchCampaignResumeInput,
    );
  }

  @Mutation((returns) => DeleteSearchCampaignResumeOutput)
  async deleteSearchCampaignResume(
    @AuthUser() user: User,
    @Args('input')
    deleteSearchCampaignResumeInput: DeleteSearchCampaignResumeInput,
  ): Promise<DeleteSearchCampaignResumeOutput> {
    return this.searchService.deleteSearchCampaignResume(
      user,
      deleteSearchCampaignResumeInput,
    );
  }

  @Query((returns) => SearchResumesOutput)
  async searchResumes(
    @AuthUser() user: User,
    @Args('input') searchResumesInput: SearchResumesInput,
  ): Promise<SearchResumesOutput> {
    return await this.searchService.searchResume(user, searchResumesInput);
  }

  @Query((returns) => ListSearchCampaignOutput)
  async listSearchCampaignResumes(
    @AuthUser() user: User,
    @Args('input') listSearchCampaignInput: ListSearchCampaignInput,
  ): Promise<ListSearchCampaignOutput> {
    return await this.searchService.listSearchCampaignResume(
      user,
      listSearchCampaignInput,
    );
  }

  @Query((returns) => SearchJobsOutput)
  async searchJobs(
    @Args('input') searchJobsInput: SearchJobsInput,
  ): Promise<SearchJobsOutput> {
    return await this.searchService.searchJobs(searchJobsInput);
  }

  @Query((returns) => SearchCompaniesOutput)
  async searchCompanies(
    @Args('input') searchCompaniesInput: SearchCompaniesInput,
  ): Promise<SearchCompaniesOutput> {
    return await this.searchService.searchCompanies(searchCompaniesInput);
  }
}
