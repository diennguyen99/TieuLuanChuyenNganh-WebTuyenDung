import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Company } from '../entities/company.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditCompanyInput extends PickType(Company, [
  'id',
  'name',
  'description',
  'phone',
  'website',
  'facebook',
  'foundedYear',
  'companySize',
  'averageAge',
  'address',
]) {
  @Field((type) => String)
  citySlug: string;
}

@ObjectType()
export class EditCompanyOutput extends BaseOutput {}
