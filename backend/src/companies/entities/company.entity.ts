import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  RelationId,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { City } from '../../cities/entities/city.entity';
import { Job } from '../../jobs/entities/job.entity';

@InputType('CompanyInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Company extends BaseEntity {
  @Field((type) => User, { nullable: true })
  @OneToOne((type) => User, { nullable: true })
  @JoinColumn()
  user: User;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  slug: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  logo: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  thumbnail: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  website: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  facebook: string;

  @Field((type) => Int, { nullable: true })
  @Column({ nullable: true })
  foundedYear: number;

  @Field((type) => Int, { nullable: true })
  @Column({ nullable: true })
  companySize: number;

  @Field((type) => Int, { nullable: true })
  @Column({ nullable: true })
  averageAge: number;

  @Field((type) => City, { nullable: true })
  @ManyToOne((type) => City)
  city: City;

  @Field((type) => Int, { nullable: true })
  @RelationId((company: Company) => company.city)
  cityId: number;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field((type) => Int, { nullable: true })
  @Column({ default: 0 })
  point: number;

  @Field((type) => [Job], { nullable: true })
  @OneToMany((type) => Job, (job) => job.user)
  jobs: Job[];

  @BeforeInsert()
  @BeforeUpdate()
  convertSlug() {
    const uuid = uuidv4();
    const slug = slugify(this.name, { lower: true });
    this.slug = `${slug}-${uuid}`;
  }
}
