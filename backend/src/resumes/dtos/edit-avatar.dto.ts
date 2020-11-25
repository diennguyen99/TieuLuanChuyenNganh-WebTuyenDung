import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditAvatarInput {
  @Field((type) => String)
  avatar: string;
}

@ObjectType()
export class EditAvatarOutput extends BaseOutput {}
