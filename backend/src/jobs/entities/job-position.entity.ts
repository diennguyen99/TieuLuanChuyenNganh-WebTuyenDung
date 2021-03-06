import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';
import slugify from 'slugify';

@InputType('JobPositionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class JobPosition extends BaseEntity {
  @Field((type) => String)
  @Column()
  name: string;

  @Field((type) => String)
  @Column()
  slug: string;

  @BeforeInsert()
  @BeforeUpdate()
  convertSlug() {
    this.slug = slugify(this.name, { lower: true });
  }
}
