import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';
import { Resume } from './resume.entity';
import { IsEnum } from 'class-validator';
import { ResumeType } from './resume-type.entity';
import { User } from '../../users/entities/user.entity';

enum ResumeStatus {
  New = 'New',
  Dismiss = 'Dismiss',
  Approved = 'Approved',
}

registerEnumType(ResumeStatus, { name: 'ResumeStatus' });

@InputType('ResumeOpenTypeInput', { isAbstract: true })
@ObjectType()
@Entity()
export class ResumeOpen extends BaseEntity {
  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.resumeOpens, { nullable: true, eager: true })
  user: User;

  @RelationId((resumeOpen: ResumeOpen) => resumeOpen.user)
  userId: number;

  @Field((type) => Resume)
  @ManyToOne((type) => Resume, { nullable: true })
  resume: Resume;

  @RelationId((resumeOpen: ResumeOpen) => resumeOpen.resume)
  resumeId: number;

  @Column({ type: 'enum', enum: ResumeStatus, default: ResumeStatus.New })
  @Field((type) => ResumeStatus, { nullable: true })
  @IsEnum(ResumeStatus)
  resumeStatus: ResumeStatus;

  @Field((type) => ResumeType)
  @ManyToOne((type) => ResumeType, (resumeType) => resumeType.resumeOpens, { nullable: true })
  resumeType: ResumeType;

  @RelationId((resumeOpen: ResumeOpen) => resumeOpen.resumeType)
  resumeTypeId: number;
}
