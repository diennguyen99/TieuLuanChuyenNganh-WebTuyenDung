import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { PackageService } from './package.service';
import { PackagesResolver } from './packages.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Package])],
  providers: [PackageService, PackagesResolver],
})
export class PackagesModule {}
