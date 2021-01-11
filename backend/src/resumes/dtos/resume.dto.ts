import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Resume } from '../entities/resume.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class ResumeInput {
  @Field((type) => Int)
  id: number;
}

@ObjectType()
export class ResumeOutput extends BaseOutput {
  @Field((type) => Resume)
  resume?: Resume;
}
