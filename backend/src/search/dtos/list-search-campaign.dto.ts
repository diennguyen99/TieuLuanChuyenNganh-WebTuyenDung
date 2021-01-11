import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { SearchCampaign } from '../entities/ search-campaign.entity';

@InputType()
export class ListSearchCampaignInput extends PaginationInput {}

@ObjectType()
export class ListSearchCampaignOutput extends PaginationOutput {
  @Field((type) => [SearchCampaign], { nullable: true })
  listSearchCampaign?: SearchCampaign[];
}
