import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditLogoInput {
  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  base64Logo: string;
}

@ObjectType()
export class EditLogoOutput extends BaseOutput {
  @Field((type) => String, { nullable: true })
  url?: string;
}
