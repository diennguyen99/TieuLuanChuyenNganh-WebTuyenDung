import { Field, ObjectType } from '@nestjs/graphql';
import { JobSector } from '../entities/job-sector.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@ObjectType()
export class JobSectorsOutput extends BaseOutput {
  @Field((type) => [JobSector], { nullable: true })
  results?: JobSector[];
}
