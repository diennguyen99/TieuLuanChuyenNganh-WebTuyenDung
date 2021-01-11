import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { JobPosition } from '../entities/job-position.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class DeleteJobPositionInput extends PickType(JobPosition, ['id']) {}

@ObjectType()
export class DeleteJobPositionOutput extends BaseOutput {}
