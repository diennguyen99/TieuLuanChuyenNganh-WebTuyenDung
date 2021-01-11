import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';
import { JobPosition } from '../entities/job-position.entity';

@ObjectType()
export class JobPositionsOutput extends BaseOutput {
  @Field((type) => [JobPosition], { nullable: true })
  results?: JobPosition[];
}
