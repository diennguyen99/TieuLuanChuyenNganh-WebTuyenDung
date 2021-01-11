import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';
import { School } from '../entities/school.entity';

@InputType()
export class DeleteSchoolInput extends PickType(School, ['id']) {}

@ObjectType()
export class DeleteSchoolOutput extends BaseOutput {}
