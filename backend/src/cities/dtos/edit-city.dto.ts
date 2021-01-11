import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { City } from '../entities/city.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditCityInput extends PickType(City, ['id', 'name']) {}

@ObjectType()
export class EditCityOutput extends BaseOutput {}
