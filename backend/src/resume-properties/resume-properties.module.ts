import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { ResumePropertiesService } from './resume-properties.service';
import { ResumePropertiesResolver } from './resume-properties.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  providers: [ResumePropertiesService, ResumePropertiesResolver],
})
export class ResumePropertiesModule {}
