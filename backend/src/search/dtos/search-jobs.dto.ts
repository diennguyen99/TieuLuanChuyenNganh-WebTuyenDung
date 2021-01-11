import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { Job } from '../../jobs/entities/job.entity';

@InputType()
export class SearchJobsInput extends PaginationInput {
  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => String, { nullable: true })
  citySlug?: string;

  @Field((type) => String, { nullable: true })
  jobSectorSlug?: string;

  @Field((type) => String, { nullable: true })
  jobTypeSlug?: string;
}

@ObjectType()
export class SearchJobsOutput extends PaginationOutput {
  @Field((type) => [Job], { nullable: true })
  jobs?: Job[];
}
