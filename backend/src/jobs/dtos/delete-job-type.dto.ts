import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { JobType } from '../entities/job-type.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class DeleteJobTypeInput extends PickType(JobType, ['id']) {}

@ObjectType()
export class DeleteJobTypeOutput extends BaseOutput {}
