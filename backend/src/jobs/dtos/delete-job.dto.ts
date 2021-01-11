import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class DeleteJobInput {
  @Field((type) => Int)
  id: number;
}

@ObjectType()
export class DeleteJobOutput extends BaseOutput {}
