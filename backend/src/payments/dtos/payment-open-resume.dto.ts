import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class PaymentOpenResumeInput {
  @Field((type) => Int)
  resumeId: number;
}

@ObjectType()
export class PaymentOpenResumeOutput extends BaseOutput {}
