import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { JobPosition } from '../entities/job-position.entity';

@InputType()
export class AdminJobPositionsInput extends PaginationInput {}

@ObjectType()
export class AdminJobPositionsOutput extends PaginationOutput {
  @Field((type) => [JobPosition], { nullable: true })
  jobPositions?: JobPosition[];
}
