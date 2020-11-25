import { Field, ObjectType } from '@nestjs/graphql';
import { Package } from '../entities/package.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@ObjectType()
export class PackagesOutput extends BaseOutput {
  @Field((type) => [Package], { nullable: true })
  results?: Package[];
}
