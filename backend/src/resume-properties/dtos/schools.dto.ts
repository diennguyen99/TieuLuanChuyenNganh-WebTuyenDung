import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';
import { School } from '../entities/school.entity';

@ObjectType()
export class SchoolsOutput extends BaseOutput {
  @Field((type) => [School], { nullable: true })
  schools?: School[];
}
