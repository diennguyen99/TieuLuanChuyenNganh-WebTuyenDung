import { InputType, PickType } from '@nestjs/graphql';
import { Company } from '../entities/company.entity';

@InputType()
export class CompanyBySlugInput extends PickType(Company, ['slug']) {}
