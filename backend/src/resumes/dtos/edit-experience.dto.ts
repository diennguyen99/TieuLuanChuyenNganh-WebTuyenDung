import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreateExperienceInput } from './create-resume.dto';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditExperienceInput {
  @Field((type) => [CreateExperienceInput])
  experiences: CreateExperienceInput[];
}

@ObjectType()
export class EditExperienceOutput extends BaseOutput {}
