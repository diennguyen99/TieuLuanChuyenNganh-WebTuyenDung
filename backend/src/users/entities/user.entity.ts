import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum } from 'class-validator';

import { Payment } from '../../payments/entities/payment.entity';
import { Resume } from '../../resumes/entities/resume.entity';

enum UserRole {
  Candidate = 'Candidate',
  Employer = 'Employer',
  Admin = 'Admin',
}

enum UserSex {
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

  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Field((type) => [Payment])
  @OneToMany(
    type => Payment,
    payment => payment.user,
    { eager: true },
  )
  payments: Payment[];

  @Column({ type: 'enum', enum: UserSex, nullable: true })
  @Field((type) => UserSex)
  @IsEnum(UserSex)
  sex: UserSex;

  @Column({ nullable: true })
  @Field((type) => Date)
  birthDay: Date;

  @Column({ nullable: true })
  @Field((type) => String)
  address: string;

  @Column({ nullable: true })
  @Field((type) => String)
  phone: string;

  @Column({ nullable: true })
  @Field((type) => String)
  description: string;

  @Field((type) => [Resume])
  @OneToMany(
    type => Resume,
    resume => resume.user,
    { eager: true },
  )
  resumes: Resume[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(password, this.password);
      return ok;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
