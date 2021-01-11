import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { School } from '../entities/school.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditSchoolInput extends PickType(School, [
  'id',
  'name',
  'subName',
]) {}

@ObjectType()
export class EditSchoolOutput extends BaseOutput {}
