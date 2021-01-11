import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Skill } from './entities/skill.entity';
import { SkillsService } from './skills.service';
import { CreateSkillInput, CreateSkillOutput } from './dtos/create-skill.dto';
import { SkillsOutput } from './dtos/skills.dto';

@Resolver((of) => Skill)
export class SkillsResolver {
  constructor(private readonly skillsService: SkillsService) {}

  @Mutation((returns) => CreateSkillOutput)
  async createSkill(
    @Args('input') createSkillInput: CreateSkillInput,
  ): Promise<CreateSkillOutput> {
    return this.skillsService.createSkill(createSkillInput);
  }

  @Query((returns) => SkillsOutput)
  async getSkills(): Promise<SkillsOutput> {
    return await this.skillsService.getSkills();
  }
}
