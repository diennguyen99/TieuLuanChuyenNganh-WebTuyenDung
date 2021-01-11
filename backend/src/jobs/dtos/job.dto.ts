import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';
import { Job } from '../entities/job.entity';

@InputType()
export class JobInput {
  @Field((type) => Int)
  id: number;
}

@ObjectType()
export class JobOutput extends BaseOutput {
  @Field((type) => Job, { nullable: true })
  job?: Job;
}
