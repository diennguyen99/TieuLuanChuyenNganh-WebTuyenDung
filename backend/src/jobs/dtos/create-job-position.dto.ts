import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { JobPosition } from '../entities/job-position.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateJobPositionInput extends PickType(JobPosition, ['name']) {}

@ObjectType()
export class CreateJobPositionOutput extends BaseOutput {
  @Field((type) => Int, { nullable: true })
  id?: number;
}
