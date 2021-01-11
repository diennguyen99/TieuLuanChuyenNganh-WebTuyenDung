import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class EditThumbnailInput {
  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  base64Thumbnail: string;
}

@ObjectType()
export class EditThumbnailOutput extends BaseOutput {
  @Field((type) => String, { nullable: true })
  url?: string;
}
