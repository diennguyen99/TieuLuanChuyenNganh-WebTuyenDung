import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { Company } from '../../companies/entities/company.entity';

@InputType()
export class SearchCompaniesInput extends PaginationInput {
  @Field((type) => String, { nullable: true })
  nameCompany = '';
}

@ObjectType()
export class SearchCompaniesOutput extends PaginationOutput {
  @Field((type) => [Company], { nullable: true })
  companies?: Company[];
}
