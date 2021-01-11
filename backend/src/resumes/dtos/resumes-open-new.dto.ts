import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';
import { ResumeOpen } from '../entities/resume-open.entity';

@ObjectType()
export class ResumesOpenNewOutput extends BaseOutput {
  @Field((type) => [ResumeOpen], { nullable: true })
  resumesOpen?: ResumeOpen[];
}
