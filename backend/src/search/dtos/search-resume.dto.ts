import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { Resume } from '../../resumes/entities/resume.entity';
import { SearchCampaign } from '../entities/ search-campaign.entity';

@InputType()
export class SearchResumesInput extends PaginationInput {
  @Field((type) => Int)
  id: number;
}

@ObjectType()
export class SearchResumesOutput extends PaginationOutput {
  @Field((type) => SearchCampaign, { nullable: true })
  searchCampaign?: SearchCampaign;

  @Field((type) => [Resume], { nullable: true })
  resumes?: Resume[];
}
