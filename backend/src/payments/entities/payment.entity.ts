import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Package } from '../../packages/entities/package.entity';

@InputType('PaymentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends BaseEntity {
  @Field((type) => String)
  @Column()
  transactionId: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.payments)
  user: User;

  @RelationId((payment: Payment) => payment.user)
  userId: number;

  @Field((type) => Package)
  @ManyToOne((type) => Package)
  package: Package;

  @Field((type) => Int)
  @RelationId((payment: Payment) => payment.package)
  packageId: number;
}
