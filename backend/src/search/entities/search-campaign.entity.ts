import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { JobPosition } from '../../jobs/entities/job-position.entity';
import { JobType } from '../../jobs/entities/job-type.entity';
import { JobSector } from '../../jobs/entities/job-sector.entity';
import { City } from '../../cities/entities/city.entity';

@InputType('SearchCampaignInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class SearchCampaign extends BaseEntity {
  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.searchCampaignList)
  user: User;

  @Field((type) => Int)
  @RelationId((searchCampaign: SearchCampaign) => searchCampaign.user)
  userId: number;

  @Field((type) => String)
  @Column()
  name: string;

  @Field((type) => JobPosition)
  @ManyToOne((type) => JobPosition)
  jobPosition: JobPosition;

  @Field((type) => Int)
  @RelationId((searchCampaign: SearchCampaign) => searchCampaign.jobPosition)
  jobPositionId: number;

  @Field((type) => JobType)
  @ManyToOne((type) => JobType)
  jobType: JobType;

  @Field((type) => Int)
  @RelationId((searchCampaign: SearchCampaign) => searchCampaign.jobType)
  jobTypeId: number;

  @Field((type) => JobSector)
  @ManyToOne((type) => JobSector)
  jobSector: JobSector;

  @Field((type) => Int)
  @RelationId((searchCampaign: SearchCampaign) => searchCampaign.jobSector)
  jobSectorId: number;

  @Field((type) => City)
  @ManyToOne((type) => City)
  city: JobSector;

  @Field((type) => Int)
  @RelationId((searchCampaign: SearchCampaign) => searchCampaign.city)
  cityId: number;

  @Field((type) => [String])
  @Column({ type: 'jsonb' })
  skills: string[];
}
