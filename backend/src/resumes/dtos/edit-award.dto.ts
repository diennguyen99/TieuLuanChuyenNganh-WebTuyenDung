import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreateAwardInput } from './create-resume.dto';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditAwardInput {
  @Field((type) => [CreateAwardInput])
  awards: CreateAwardInput[];
}

@ObjectType()
export class EditAwardOutput extends BaseOutput {}
