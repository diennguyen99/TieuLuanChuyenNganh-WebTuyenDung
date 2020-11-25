import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from './dtos/create-payment.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver((of) => Payment)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation((returns) => CreatePaymentOutput)
  async createPayment(
    @AuthUser() user: User,
    @Args('input') createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    return await this.paymentsService.createPayment(user, createPaymentInput);
  }
}
