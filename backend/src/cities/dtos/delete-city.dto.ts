import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { City } from '../entities/city.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class DeleteCityInput extends PickType(City, ['id']) {}

@ObjectType()
export class DeleteCityOutput extends BaseOutput {}
