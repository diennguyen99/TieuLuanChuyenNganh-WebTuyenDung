import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { JobSector } from '../entities/job-sector.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditJobSectorInput extends PickType(JobSector, ['id', 'name']) {}

@ObjectType()
export class EditJobSectorOutput extends BaseOutput {}
