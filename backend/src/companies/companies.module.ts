import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company } from './entities/company.entity';
import { City } from '../cities/entities/city.entity';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Company, City])],
  providers: [CompaniesService, CompaniesResolver],
})
export class CompaniesModule {}
