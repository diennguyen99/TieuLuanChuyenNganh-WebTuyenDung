import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Skill } from './entities/skill.entity';
import { CreateSkillInput, CreateSkillOutput } from './dtos/create-skill.dto';
import { SkillsOutput } from './dtos/skills.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skills: Repository<Skill>,
  ) {}

  async createSkill({ name }: CreateSkillInput): Promise<CreateSkillOutput> {
    try {
      const newSkill = this.skills.create({ name });
      await this.skills.save(newSkill);

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

  async getSkills(): Promise<SkillsOutput> {
    try {
      const results = await this.skills.find();
      return {
        ok: true,
        results,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
