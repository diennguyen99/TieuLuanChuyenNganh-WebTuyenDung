import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';
import { AppliedJob } from '../entities/applied-job.entity';

@InputType()
export class UploadCvInput extends PickType(AppliedJob, [
  'name',
  'email',
  'content',
]) {
  @Field((type) => String)
  jobSlug: string;

  @Field((type) => String, { nullable: true })
  file: string;

  @Field((type) => Boolean)
  myCvOnline: boolean;
}

@ObjectType()
export class UploadCvOutput extends BaseOutput {}
