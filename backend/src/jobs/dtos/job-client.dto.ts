import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Job } from '../entities/job.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class JobClientInput extends PickType(Job, ['slug']) {}

@ObjectType()
export class JobClientOutput extends BaseOutput {
  @Field((type) => Job, { nullable: true })
  job?: Job;
}
