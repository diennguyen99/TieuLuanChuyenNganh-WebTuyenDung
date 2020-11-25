import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['name', 'sex', 'birthDay', 'phone', 'description']),
) {}

@ObjectType()
export class EditProfileOutput extends BaseOutput {}
