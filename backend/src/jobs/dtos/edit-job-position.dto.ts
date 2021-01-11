import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { JobPosition } from '../entities/job-position.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditJobPositionInput extends PickType(JobPosition, [
  'id',
  'name',
]) {}

@ObjectType()
export class EditJobPositionOutput extends BaseOutput {}
