import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CreatePackageInput } from './create-package.dto';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditPackageInput extends PartialType(CreatePackageInput) {
  @Field((type) => Number)
  packageId: number;
}

@ObjectType()
export class EditPackageOutput extends BaseOutput {}
