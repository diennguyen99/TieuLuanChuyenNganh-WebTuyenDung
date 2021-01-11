import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { JobType } from '../entities/job-type.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditJobTypeInput extends PickType(JobType, ['id', 'name']) {}

@ObjectType()
export class EditJobTypeOutput extends BaseOutput {}
