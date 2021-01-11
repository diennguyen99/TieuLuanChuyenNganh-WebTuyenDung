import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';
import { Job } from '../entities/job.entity';

@InputType()
export class EditJobInput extends PickType(Job, [
  'id',
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
export class EditJobOutput extends BaseOutput {}
