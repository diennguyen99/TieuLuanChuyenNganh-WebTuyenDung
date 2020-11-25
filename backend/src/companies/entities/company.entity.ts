import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Resume } from '../../resumes/entities/resume.entity';

@InputType('CompanyInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Company extends BaseEntity {
  @Field((type) => User)
  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

  @Field((type) => String)
  @Column()
  name: string;

  @Field((type) => String)
  @Column({ nullable: true })
  description: string;

  @Field((type) => String)
  @Column({ nullable: true })
  phone: string;

  @Field((type) => String)
  @Column({ nullable: true })
  logo: string;

  @Field((type) => String)
  @Column({ nullable: true })
  thumbnail: string;

  @Field((type) => String)
  @Column({ nullable: true })
  website: string;

  @Field((type) => String)
  @Column({ nullable: true })
  facebook: string;

  @Field((type) => Number)
  @Column({ nullable: true })
  foundedYear: number;

  @Field((type) => Number)
  @Column({ nullable: true })
  companySize: number;

  @Field((type) => Number)
  @Column({ nullable: true })
  averageAge: number;

  @Field((type) => String)
  @Column()
  city: string;

  @Field((type) => Number)
  @Column({ default: 0 })
  point: number;

  @Field((type) => [Resume])
  @ManyToMany((type) => Resume, { eager: true })
  @JoinTable()
  opened: Resume[];
}
