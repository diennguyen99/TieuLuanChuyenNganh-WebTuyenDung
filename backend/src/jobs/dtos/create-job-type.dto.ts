import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { JobType } from '../entities/job-type.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateJobTypeInput extends PickType(JobType, ['name']) {}

@ObjectType()
export class CreateJobTypeOutput extends BaseOutput {
  @Field((type) => Int, { nullable: true })
  id?: number;
}
