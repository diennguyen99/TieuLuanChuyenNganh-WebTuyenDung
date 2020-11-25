import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditSkillInput {
  @Field((type) => [String])
  skills: string[];
}

@ObjectType()
export class EditSkillOutput extends BaseOutput {}
