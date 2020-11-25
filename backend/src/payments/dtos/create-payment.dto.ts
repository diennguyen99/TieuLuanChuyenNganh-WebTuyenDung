import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Payment } from '../entities/payment.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreatePaymentInput extends PickType(Payment, [
  'transactionId',
  'packageId',
]) {}

@ObjectType()
export class CreatePaymentOutput extends BaseOutput {}
