import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updatedAt: Date;
}
