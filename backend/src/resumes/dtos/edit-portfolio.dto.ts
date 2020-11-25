import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreatePortfolioInput } from './create-resume.dto';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditPortfolioInput {
  @Field((type) => [CreatePortfolioInput])
  portfolios: CreatePortfolioInput[];
}

@ObjectType()
export class EditPortfolioOutput extends BaseOutput {}
