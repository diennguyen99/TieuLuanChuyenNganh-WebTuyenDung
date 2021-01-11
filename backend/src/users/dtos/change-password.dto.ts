import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class ChangePasswordInput {
  @Field((type) => String)
  oldPassword: string;

  @Field((type) => String)
  newPassword: string;
}

@ObjectType()
export class ChangePasswordOutput extends BaseOutput {}
