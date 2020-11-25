import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
class Education {
  @Field((type) => String)
  title: string;

  @Field((type) => Number)
  year: number;

  @Field((type) => String)
  institute: string;
}

@ObjectType()
class Experience {
  @Field((type) => String)
  title: string;

  @Field((type) => Date)
  fromDate: Date;

  @Field((type) => Date)
  toDate: Date;

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

  @Field((type) => Number)
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

@InputType('ResumeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Resume extends BaseEntity {
  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.resumes)
  user: User;

  @RelationId((resume: Resume) => resume.user)
  userId: number;

  @Field((type) => String)
  @Column({ nullable: true })
  avatar: string;

  @Field((type) => String)
  @Column({ nullable: true })
  coverLetter: string;

  @Field((type) => [String])
  @Column({ type: 'jsonb', nullable: true })
  skills: string[];

  @Field((type) => [Education])
  @Column({ type: 'jsonb', nullable: true })
  educations: Education[];

  @Field((type) => [Experience])
  @Column({ type: 'jsonb', nullable: true })
  experiences: Experience[];

  @Field((type) => [Portfolio])
  @Column({ type: 'jsonb', nullable: true })
  portfolios: Portfolio[];

  @Field((type) => [Expertise])
  @Column({ type: 'jsonb', nullable: true })
  expertises: Expertise[];

  @Field((type) => [Language])
  @Column({ type: 'jsonb', nullable: true })
  languages: Language[];

  @Field((type) => [Award])
  @Column({ type: 'jsonb', nullable: true })
  awards: Award[];
}
