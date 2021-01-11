import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';
import { Skill } from '../entities/skill.entity';

@ObjectType()
export class SkillsOutput extends BaseOutput {
  @Field((type) => [Skill])
  results?: Skill[];
}
