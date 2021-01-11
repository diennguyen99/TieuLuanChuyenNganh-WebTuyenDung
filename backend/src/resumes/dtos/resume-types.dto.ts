import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { ResumeType } from '../entities/resume-type.entity';

@InputType()
export class ResumeTypesInput extends PaginationInput {}

@ObjectType()
export class ResumeTypesOutput extends PaginationOutput {
  @Field((type) => [ResumeType], { nullable: true })
  resumeTypes?: ResumeType[];
}
