import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Skill } from '../entities/skill.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateSkillInput extends PickType(Skill, ['name']) {}

@ObjectType()
export class CreateSkillOutput extends BaseOutput {}
