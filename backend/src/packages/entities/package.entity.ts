import { BaseEntity } from '../../common/entities/base.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

enum PackageType {
  Cv,
  Post,
}

registerEnumType(PackageType, { name: 'PackageType' });

@InputType('PackageInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Package extends BaseEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  price: number;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  duration: number;

  @Field((type) => Boolean)
  @Column({ default: false })
  @IsBoolean()
  isFeatured: boolean;

  @Field((type) => Boolean)
  @Column({ default: false })
  @IsBoolean()
  isSupport: boolean;

  @Column({ type: 'enum', enum: PackageType })
  @Field((type) => PackageType)
  @IsEnum(PackageType)
  packageType: PackageType;
}
