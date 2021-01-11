import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@InputType('SchoolInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class School extends BaseEntity {
  @Field((type) => String)
  @Column()
  name: string;

  @Field((type) => String)
  @Column()
  subName: string;
}
