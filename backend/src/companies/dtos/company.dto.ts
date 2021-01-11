import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Company } from '../entities/company.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CompanyInput {
  @Field((type) => Int)
  id: number;
}

@ObjectType()
export class CompanyOutput extends BaseOutput {
  @Field((type) => Company, { nullable: true })
  company?: Company;
}
