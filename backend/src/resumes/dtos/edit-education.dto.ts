import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreateEducationInput } from './create-resume.dto';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditEducationInput {
  @Field((type) => [CreateEducationInput])
  educations: CreateEducationInput[];
}

@ObjectType()
export class EditEducationOutput extends BaseOutput {}
