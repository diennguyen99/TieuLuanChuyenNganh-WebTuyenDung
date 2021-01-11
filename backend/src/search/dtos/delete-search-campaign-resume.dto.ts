import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class DeleteSearchCampaignResumeInput {
  @Field((type) => Int)
  id;
}

@ObjectType()
export class DeleteSearchCampaignResumeOutput extends BaseOutput {}
