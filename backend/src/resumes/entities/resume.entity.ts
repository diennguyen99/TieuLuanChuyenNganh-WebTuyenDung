import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, RelationId } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ResumeOpen } from './resume-open.entity';

@ObjectType()
export class Education {
  @Field((type) => String)
  title: string;

  @Field((type) => Number)
  year: number;

  @Field((type) => String)
  institute: string;
}

@ObjectType()
class MySkill {
  @Field((type) => String)
  name: string;

  @Field((type) => Number)
  percentage: number;
}

@ObjectType()
class Experience {
  @Field((type) => String)
  title: string;

  @Field((type) => String, { nullable: true })
  fromDate: string;

  @Field((type) => String, { nullable: true })
  toDate: string;

  @Field((type) => Boolean)
  present: boolean;

  @Field((type) => String)
  company: string;
}

@ObjectType()
class Portfolio {
  @Field((type) => String)
  title: string;

  @Field((type) => String)
  image: string;

  @Field((type) => String)
  url: string;
}

@ObjectType()
class Expertise {
  @Field((type) => String)
  label: string;

  @Field((type) => Int)
  percentage: number;
}

@ObjectType()
class Language extends Expertise {}

@ObjectType()
class Award {
  @Field((type) => String)
  title: string;

  @Field((type) => Number)
  year: number;

  @Field((type) => String)
  description: string;
}

@InputType('ResumeInputTypeInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Resume extends BaseEntity {
  @Field((type) => User)
  @OneToOne((type) => User, { eager: true })
  @JoinColumn()
  user: User;

  @Field((type) => Int)
  @RelationId((resume: Resume) => resume.user)
  userId: number;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field((type) => [MySkill])
  @Column({ type: 'jsonb', nullable: true, default: [] })
  skills: MySkill[];

  @Field((type) => [Education])
  @Column({ type: 'jsonb', nullable: true, default: [] })
  educations: Education[];

  @Field((type) => [Experience])
  @Column({ type: 'jsonb', nullable: true, default: [] })
  experiences: Experience[];

  @Field((type) => [Portfolio])
  @Column({ type: 'jsonb', nullable: true, default: [] })
  portfolios: Portfolio[];

  @Field((type) => [Expertise])
  @Column({ type: 'jsonb', nullable: true, default: [] })
  expertises: Expertise[];

  @Field((type) => [Language])
  @Column({ type: 'jsonb', nullable: true, default: [] })
  languages: Language[];

  @Field((type) => [Award])
  @Column({ type: 'jsonb', nullable: true, default: [] })
  awards: Award[];

  @Field((type) => ResumeOpen)
  @OneToMany(() => ResumeOpen, (resumeOpen) => resumeOpen.resume)
  resumeOpen!: ResumeOpen[];
}
