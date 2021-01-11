import { Column, Entity } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';

@InputType('TypeSkillInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Skill extends BaseEntity {
  @Field((type) => String)
  @Column()
  name: string;
}
