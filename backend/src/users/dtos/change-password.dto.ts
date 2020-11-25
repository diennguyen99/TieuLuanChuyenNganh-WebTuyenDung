import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class ChangePasswordInput extends PartialType(
  PickType(User, ['password']),
) {}

@ObjectType()
export class ChangePasswordOutput extends BaseOutput {}
