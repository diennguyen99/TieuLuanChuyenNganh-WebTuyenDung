import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Job } from '../../jobs/entities/job.entity';
import { Resume } from '../../resumes/entities/resume.entity';

@InputType('AppliedJobInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class AppliedJob extends BaseEntity {
  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User,{ nullable: true })
  user: User;

  @RelationId((appliedJob: AppliedJob) => appliedJob.job)
  userId: number;

  @Field((type) => Job, { nullable: true })
  @ManyToOne((type) => Job, { nullable: true } )
  job: Job;

  @RelationId((appliedJob: AppliedJob) => appliedJob.job)
  jobId: number;

  @Field((type) => String)
  @Column()
  name: string;

  @Field((type) => String)
  @Column()
  email: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  cvUpload: string;

  @Field((type) => Resume, { nullable: true })
  @ManyToOne((type) => Resume, { nullable: true })
  cvOnline: Resume;

  @RelationId((appliedJob: AppliedJob) => appliedJob.cvOnline)
  cvOnlineId: number;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  content: string;
}
