import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Company } from '../entities/company.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateCompanyInput extends PickType(Company, ['name', 'city']) {}

@ObjectType()
export class CreateCompanyOutput extends BaseOutput {}
