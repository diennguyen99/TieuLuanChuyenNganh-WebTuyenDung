import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Skill } from './entities/skill.entity';
import { SkillsService } from './skills.service';
import { SkillsResolver } from './skills.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SkillsService, SkillsResolver],
})
export class SkillsModule {}
