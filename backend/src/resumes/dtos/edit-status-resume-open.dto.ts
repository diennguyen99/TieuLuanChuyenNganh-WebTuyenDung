import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ResumeOpen } from '../entities/resume-open.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditStatusResumeOpenInput extends PickType(ResumeOpen, [
  'id',
  'resumeStatus',
]) {}

@ObjectType()
export class EditStatusResumeOpenOutput extends BaseOutput {}
