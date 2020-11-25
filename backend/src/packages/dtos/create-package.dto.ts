import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Package } from '../entities/package.entity';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreatePackageInput extends PickType(Package, [
  'name',
  'price',
  'duration',
  'isFeatured',
  'isSupport',
  'packageType',
]) {}

@ObjectType()
export class CreatePackageOutput extends BaseOutput {}
