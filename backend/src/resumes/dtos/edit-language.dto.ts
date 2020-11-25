import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreateLanguageInput } from './create-resume.dto';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditLanguageInput {
  @Field((type) => [CreateLanguageInput])
  languages: CreateLanguageInput[];
}

@ObjectType()
export class EditLanguageOutput extends BaseOutput {}
