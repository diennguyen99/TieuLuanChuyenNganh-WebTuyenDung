import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';
import { School } from '../entities/school.entity';

@InputType()
export class CreateSchoolInput extends PickType(School, [
  'name',
  'subName',
]) {}

@ObjectType()
export class CreateSchoolOutput extends BaseOutput {
  @Field((type) => Int, { nullable: true })
  id?: number;
}
