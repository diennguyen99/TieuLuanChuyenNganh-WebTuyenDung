import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';
import { Company } from '../companies/entities/company.entity';
import { Package } from '../packages/entities/package.entity';
import { Resume } from '../resumes/entities/resume.entity';
import { ResumeOpen } from '../resumes/entities/resume-open.entity';
import { Job } from '../jobs/entities/job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      Package,
      Company,
      Resume,
      ResumeOpen,
      Job,
    ]),
  ],
  providers: [PaymentsService, PaymentsResolver],
})
export class PaymentsModule {}
