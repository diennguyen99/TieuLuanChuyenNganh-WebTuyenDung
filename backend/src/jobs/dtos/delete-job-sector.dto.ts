import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { JobSector } from '../entities/job-sector.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class DeleteJobSectorInput extends PickType(JobSector, ['id']) {}

@ObjectType()
export class DeleteJobSectorOutput extends BaseOutput {}
