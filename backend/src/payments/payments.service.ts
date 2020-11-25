import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from './dtos/create-payment.dto';
import { User } from '../users/entities/user.entity';
import { Company } from '../companies/entities/company.entity';
import { Package } from '../packages/entities/package.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    @InjectRepository(Company)
    private readonly companies: Repository<Company>,
    @InjectRepository(Package)
    private readonly packages: Repository<Package>,
  ) {}

  async createPayment(
    user: User,
    createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    try {
      const newPayment = this.payments.create(createPaymentInput);
      newPayment.user = user;

      const packageDb = await this.packages.findOne(
        createPaymentInput.packageId,
      );

      if (packageDb && packageDb.packageType === 0) {
        const company = await this.companies.findOne({ id: user.id });
        company.point = company.point + packageDb.duration;
        await this.companies.save(company);
        newPayment.package = packageDb;
      }

      await this.payments.save(newPayment);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not create payment',
      };
    }
  }
}
