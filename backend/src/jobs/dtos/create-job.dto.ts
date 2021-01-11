import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { Job } from '../entities/job.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateJobInput extends PickType(Job, [
  'name',
  'address',
  'salaryType',
  'salaryMax',
  'salaryMin',
  'description',
]) {
  @Field((type) => String)
  citySlug: string;

  @Field((type) => String)
  jobPositionSlug: string;

  @Field((type) => String)
  jobTypeSlug: string;

  @Field((type) => String)
  jobSectorSlug: string;
}

@ObjectType()
export class CreateJobOutput extends BaseOutput {
  @Field((type) => Int, { nullable: true })
  jobId?: number;
}
