import { Field, ObjectType } from '@nestjs/graphql';
import { JobType } from '../entities/job-type.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@ObjectType()
export class JobTypesOutput extends BaseOutput {
  @Field((type) => [JobType], { nullable: true })
  results?: JobType[];
}
