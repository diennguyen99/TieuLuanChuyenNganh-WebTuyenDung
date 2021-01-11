import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { School } from '../entities/school.entity';

@InputType()
export class AdminSchoolsInput extends PaginationInput {}

@ObjectType()
export class AdminSchoolsOutput extends PaginationOutput {
  @Field((type) => [School], { nullable: true })
  schools?: School[];
}
