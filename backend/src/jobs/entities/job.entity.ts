import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

import { Company } from '../../companies/entities/company.entity';
import { JobSector } from './job-sector.entity';
import { JobType } from './job-type.entity';
import { City } from '../../cities/entities/city.entity';
import { User } from '../../users/entities/user.entity';
import { JobPosition } from './job-position.entity';

export enum SalaryType {
  Monthly = 'Monthly',
  Weekly = 'Weekly',
  Hourly = 'Hourly',
  Negotiable = 'Negotiable',
}

registerEnumType(SalaryType, { name: 'SalaryType' });

@InputType('JobInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Job extends BaseEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Column({ type: 'enum', enum: SalaryType })
  @Field((type) => SalaryType)
  @IsEnum(SalaryType)
  salaryType: SalaryType;

  @Field((type) => Number, { nullable: true })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  @IsNumber()
  salaryMax: number;

  @Field((type) => Number, { nullable: true })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  @IsNumber()
  salaryMin: number;

  @Field((type) => String)
  @Column({ type: 'text' })
  @IsString()
  description: string;

  @Field((type) => User)
  @ManyToOne((type) => User, { eager: true })
  user: User;

  @Field((type) => Int)
  @RelationId((job: Job) => job.user)
  userId: number;

  @Field((type) => Company)
  @ManyToOne((type) => Company, (company) => company.jobs, { eager: true })
  company: Company;

  @Field((type) => Int)
  @RelationId((job: Job) => job.company)
  companyId: number;

  @Field((type) => JobPosition)
  @ManyToOne((type) => JobPosition, { eager: true })
  jobPosition: JobPosition;

  @Field((type) => Int)
  @RelationId((job: Job) => job.jobPosition)
  jobPositionId: number;

  @Field((type) => JobSector)
  @ManyToOne((type) => JobSector, { eager: true })
  jobSector: JobSector;

  @Field((type) => Int)
  @RelationId((job: Job) => job.jobSector)
  jobSectorId: number;

  @Field((type) => JobType)
  @ManyToOne((type) => JobType, { eager: true })
  jobType: JobType;

  @Field((type) => Int)
  @RelationId((job: Job) => job.jobType)
  jobTypeId: number;

  @Field((type) => City)
  @ManyToOne((type) => City, { eager: true })
  city: City;

  @Field((type) => Int)
  @RelationId((job: Job) => job.city)
  cityId: number;

  @Field((type) => Date, { nullable: true })
  @Column({ nullable: true })
  promotedUntil: Date;

  @BeforeInsert()
  @BeforeUpdate()
  convertSlug() {
    const uuid = uuidv4();
    const slug = slugify(this.name, { lower: true });
    this.slug = `${slug}-${uuid}`;
  }
}
