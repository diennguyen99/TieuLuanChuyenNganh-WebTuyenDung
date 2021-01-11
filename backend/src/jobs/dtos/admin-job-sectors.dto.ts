import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { JobSector } from '../entities/job-sector.entity';

@InputType()
export class AdminJobSectorsInput extends PaginationInput {}

@ObjectType()
export class AdminJobSectorsOutput extends PaginationOutput {
  @Field((type) => [JobSector], { nullable: true })
  jobSectors?: JobSector[];
}
