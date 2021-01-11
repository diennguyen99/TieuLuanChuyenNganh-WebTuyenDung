import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';
import { CreateMySkillInput } from './create-resume.dto';

@InputType()
export class EditMySkillInput {
  @Field((type) => [CreateMySkillInput])
  skills: CreateMySkillInput[];
}

@ObjectType()
export class EditMySkillOutput extends BaseOutput {}
