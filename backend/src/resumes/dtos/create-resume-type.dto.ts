import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ResumeType } from '../entities/resume-type.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateResumeTypeInput extends PickType(ResumeType, ['name']) {}

@ObjectType()
export class CreateResumeTypeOutput extends BaseOutput {}
