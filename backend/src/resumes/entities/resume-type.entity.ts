import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ResumeOpen } from './resume-open.entity';

@InputType('ResumeTypeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ResumeType extends BaseEntity {
  @Field((type) => String)
  @Column()
  name: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.resumeTypes)
  user: User;

  @RelationId((resumeType: ResumeType) => resumeType.user)
  userId: number;

  @Field((type) => [ResumeOpen])
  @OneToMany(
    (type) => ResumeOpen,
    (resumeOpen) => resumeOpen.resumeType
  )
  resumeOpens: ResumeOpen[];
}
