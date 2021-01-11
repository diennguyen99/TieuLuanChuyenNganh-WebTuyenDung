import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { SearchCampaign } from '../entities/ search-campaign.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditSearchCampaignResumeInput extends PickType(SearchCampaign, [
  'id',
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
export class EditSearchCampaignResumeOutput extends BaseOutput {}
