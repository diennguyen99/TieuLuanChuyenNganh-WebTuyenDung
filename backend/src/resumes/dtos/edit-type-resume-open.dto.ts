import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditTypeResumeOpenInput {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  idResumeType: number;
}

@ObjectType()
export class EditTypeResumeOpenOutput extends BaseOutput {}
