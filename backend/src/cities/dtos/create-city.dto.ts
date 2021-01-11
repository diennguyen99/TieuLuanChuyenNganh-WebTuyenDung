import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { City } from '../entities/city.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateCityInput extends PickType(City, ['name']) {}

@ObjectType()
export class CreateCityOutput extends BaseOutput {
  @Field((type) => Int, { nullable: true })
  id?: number;
}
