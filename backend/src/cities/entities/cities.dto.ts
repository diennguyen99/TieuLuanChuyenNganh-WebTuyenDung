import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';
import { City } from './city.entity';

@ObjectType()
export class CitiesOutput extends BaseOutput {
  @Field((type) => [City], { nullable: true })
  cities?: City[];
}
