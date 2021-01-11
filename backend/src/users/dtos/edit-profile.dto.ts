import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserSex } from '../entities/user.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditProfileInput {
  @Field((type) => String)
  name: string;

  @Field((type) => UserSex)
  sex: UserSex;

  @Field((type) => Date)
  birthDay: Date;

  @Field((type) => String)
  phone: string;

  @Field((type) => String)
  address: string;

  @Field((type) => String)
  description: string;

  @Field((type) => String)
  jobPositionSlug: string;

  @Field((type) => String)
  jobTypeSlug: string;

  @Field((type) => String)
  jobSectorSlug: string;

  @Field((type) => String)
  citySlug: string;
}

@ObjectType()
export class EditProfileOutput extends BaseOutput {}
