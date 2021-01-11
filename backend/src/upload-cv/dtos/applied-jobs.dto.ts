import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { AppliedJob } from '../entities/applied-job.entity';

@InputType()
export class AppliedJobsInput extends PaginationInput {}

@ObjectType()
export class AppliedJobsOutput extends PaginationOutput {
  @Field((type) => [AppliedJob], { nullable: true })
  appliedJobs?: AppliedJob[];
}
