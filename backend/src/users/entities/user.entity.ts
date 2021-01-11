import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum } from 'class-validator';

import { Payment } from '../../payments/entities/payment.entity';
import { JobType } from '../../jobs/entities/job-type.entity';
import { JobSector } from '../../jobs/entities/job-sector.entity';
import { City } from '../../cities/entities/city.entity';
import { ResumeType } from '../../resumes/entities/resume-type.entity';
import { ResumeOpen } from '../../resumes/entities/resume-open.entity';
import { SearchCampaign } from '../../search/entities/ search-campaign.entity';
import { JobPosition } from '../../jobs/entities/job-position.entity';

export enum UserRole {
  Candidate = 'Candidate',
  Employer = 'Employer',
  Admin = 'Admin',
}

export enum UserSex {
  Male = 'Male',
  Female = 'Female',
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(UserSex, { name: 'UserSex' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Column()
  @Field((type) => String)
  name: string;

  @Column({ nullable: true })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field((type) => String)
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  phone?: string;

  @Column({ type: 'enum', enum: UserSex, nullable: true })
  @Field((type) => UserSex, { nullable: true })
  @IsEnum(UserSex)
  sex: UserSex;

  @Column({ nullable: true })
  @Field((type) => Date, { nullable: true })
  birthDay: Date;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  address: string;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  description: string;

  @Field((type) => JobPosition, { nullable: true })
  @ManyToOne((type) => JobPosition, { nullable: true })
  jobPosition: JobPosition;

  @RelationId((user: User) => user.jobPosition)
  jobPositionId: number;

  @Field((type) => JobType, { nullable: true })
  @ManyToOne((type) => JobType, { nullable: true })
  jobType: JobType;

  @RelationId((user: User) => user.jobType)
  jobTypeId: number;

  @Field((type) => JobSector, { nullable: true })
  @ManyToOne((type) => JobSector, { nullable: true })
  jobSector: JobSector;

  @RelationId((user: User) => user.jobSector)
  jobSectorId: number;

  @Field((type) => [Payment])
  @OneToMany((type) => Payment, (payment) => payment.user, { eager: true })
  payments: Payment[];

  @Field((type) => [ResumeType])
  @OneToMany((type) => ResumeType, (resumeType) => resumeType.user)
  resumeTypes: ResumeType[];

  @Field((type) => [ResumeOpen])
  @OneToMany((type) => ResumeOpen, (resumeOpen) => resumeOpen.user)
  resumeOpens: ResumeOpen[];

  @Field((type) => [SearchCampaign])
  @OneToMany((type) => SearchCampaign, (searchCampaign) => searchCampaign.user)
  searchCampaignList: SearchCampaign[];

  @Column({ default: false })
  @Field((type) => Boolean)
  verified: boolean;

  @Field((type) => City, { nullable: true })
  @ManyToOne((type) => City, { nullable: true })
  city: City;

  @Field((type) => Int)
  @RelationId((user: User) => user.city)
  cityId: number;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
