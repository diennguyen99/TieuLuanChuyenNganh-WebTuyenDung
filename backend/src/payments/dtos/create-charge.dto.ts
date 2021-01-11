import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateChargeInput {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  phone: string;

  @Field((type) => Int)
  jobId: number;

  @Field((type) => Int)
  packageId: number;

  @Field((type) => String)
  token: string;

  @Field((type) => Int)
  amount: number;
}

@ObjectType()
export class CreateChargeOutput extends BaseOutput {}
