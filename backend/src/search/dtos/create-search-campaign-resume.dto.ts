import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { SearchCampaign } from '../entities/ search-campaign.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateSearchCampaignResumeInput extends PickType(SearchCampaign, [
  'name',
  'skills',
]) {
  @Field((type) => String)
  jobPositionSlug: string;

  @Field((type) => String)
  jobTypeSlug: string;

  @Field((type) => String)
  jobSectorSlug: string;

  @Field((type) => String)
  citySlug: string;
}

@ObjectType()
export class CreateSearchCampaignResumeOutput extends BaseOutput {}
