import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { JobSector } from '../entities/job-sector.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateJobSectorInput extends PickType(JobSector, ['name']) {}

@ObjectType()
export class CreateJobSectorOutput extends BaseOutput {
  @Field((type) => Int, { nullable: true })
  id?: number;
}
