import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import {
  CreateChargeInput,
  CreateChargeOutput,
} from './dtos/create-charge.dto';
import {
  PaymentOpenResumeInput,
  PaymentOpenResumeOutput,
} from './dtos/payment-open-resume.dto';

@Resolver((of) => Payment)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation((returns) => CreateChargeOutput)
  async createCharge(
    @AuthUser() user: User,
    @Args('input') createChargeInput: CreateChargeInput,
  ): Promise<CreateChargeOutput> {
    return await this.paymentsService.createCharge(user, createChargeInput);
  }

  @Mutation((returns) => PaymentOpenResumeOutput)
  async paymentOpenResume(
    @AuthUser() employer: User,
    @Args('input') paymentOpenResumeInput: PaymentOpenResumeInput,
  ): Promise<PaymentOpenResumeOutput> {
    return await this.paymentsService.paymentResume(
      employer,
      paymentOpenResumeInput,
    );
  }
}
