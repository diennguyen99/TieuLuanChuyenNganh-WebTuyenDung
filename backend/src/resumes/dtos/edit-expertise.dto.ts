import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreateExpertiseInput } from './create-resume.dto';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditExpertiseInput {
  @Field((type) => [CreateExpertiseInput])
  expertises: CreateExpertiseInput[];
}

@ObjectType()
export class EditExpertiseOutput extends BaseOutput {}
