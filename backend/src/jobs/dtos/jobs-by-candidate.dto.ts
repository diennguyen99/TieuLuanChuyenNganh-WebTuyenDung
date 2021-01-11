import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { Job } from '../entities/job.entity';

@InputType()
export class JobsByCandidateInput extends PaginationInput {}

@ObjectType()
export class JobsByCandidateOutput extends PaginationOutput {
  @Field((type) => [Job], { nullable: true })
  jobs?: Job[];
}
