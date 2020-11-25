import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'name',
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountOutput extends BaseOutput {}
