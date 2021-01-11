import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { User } from '../users/entities/user.entity';
import { Company } from '../companies/entities/company.entity';
import { Package } from '../packages/entities/package.entity';
import { ResumeOpen } from '../resumes/entities/resume-open.entity';
import { Resume } from '../resumes/entities/resume.entity';
import {
  CreateChargeInput,
  CreateChargeOutput,
} from './dtos/create-charge.dto';
import {
  PaymentOpenResumeInput,
  PaymentOpenResumeOutput,
} from './dtos/payment-open-resume.dto';
import { Job } from '../jobs/entities/job.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    @InjectRepository(Company)
    private readonly companies: Repository<Company>,
    @InjectRepository(Package)
    private readonly packages: Repository<Package>,
    @InjectRepository(Resume)
    private readonly resumes: Repository<Resume>,
    @InjectRepository(ResumeOpen)
    private readonly resumeOpens: Repository<ResumeOpen>,
    @InjectRepository(Job)
    private readonly jobs: Repository<Job>,
  ) {}

  private async createPayment(
    name: string,
    email: string,
    phone: string,
    user: User,
    transactionId: string,
    packageId: number,
    jobId: number,
  ): Promise<void> {
    const newPayment = this.payments.create({
      name,
      email,
      phone,
      transactionId,
      user,
    });

    const packageDb = await this.packages.findOne(packageId);

    // CV
    if (packageDb && packageDb.packageType === 0) {
      const company = await this.companies.findOne({ id: user.id });
      company.point = company.point + packageDb.duration;
      await this.companies.save(company);
      newPayment.package = packageDb;
    }

    // Job
    if (packageDb && packageDb.packageType === 1) {
      const job = await this.jobs.findOne({ id: jobId });
      const date = new Date();
      date.setDate(date.getDate() + packageDb.duration);
      job.promotedUntil = date;
      await this.jobs.save(job);
      newPayment.job = job;
    }

    newPayment.package = packageDb;
    await this.payments.save(newPayment);
  }

  async createCharge(
    user: User,
    createChargeInput: CreateChargeInput,
  ): Promise<CreateChargeOutput> {
    try {
      const stripe = new Stripe('sk_test_351n8Kqu37FZbJDHd5KjJ3F800j3pgMT2j', {
        apiVersion: '2020-08-27',
        typescript: true,
      });

      const paymentIntent = await stripe.charges.create({
        amount: createChargeInput.amount,
        currency: 'usd',
        source: createChargeInput.token,
      });

      if (paymentIntent.status === 'succeeded') {
        await this.createPayment(
          createChargeInput.name,
          createChargeInput.email,
          createChargeInput.phone,
          user,
          paymentIntent.id,
          createChargeInput.packageId,
          createChargeInput.jobId,
        );
      }

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async paymentResume(
    employer: User,
    paymentOpenResumeInput: PaymentOpenResumeInput,
  ): Promise<PaymentOpenResumeOutput> {
    try {
      const company = await this.companies.findOne({ id: employer.id });

      if (!company) {
        return {
          ok: false,
          error: 'Company not found',
        };
      }

      if (company.point < 1) {
        return {
          ok: false,
          error: 'Point not enough please buy more!',
        };
      }

      const resume = await this.resumes.findOne({
        id: paymentOpenResumeInput.resumeId,
      });
      const resumeOpen = this.resumeOpens.create({
        user: employer,
        resume,
      });
      await this.resumeOpens.save(resumeOpen);

      company.point = company.point - 1;
      await this.companies.save(company);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
