import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { ResumesService } from './resumes.service';
import { ResumesResolver } from './resumes.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Resume])],
  providers: [ResumesService, ResumesResolver],
})
export class ResumesModule {}
