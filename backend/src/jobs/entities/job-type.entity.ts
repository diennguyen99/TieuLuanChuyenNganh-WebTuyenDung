import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { IsString } from 'class-validator';
import slugify from 'slugify';

@InputType('JobTypeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class JobType extends BaseEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  slug: string;

  @BeforeInsert()
  @BeforeUpdate()
  convertSlug() {
    this.slug = slugify(this.name, { lower: true });
  }
}
