import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateMySkillInput {
  @Field((type) => String)
  name: string;

  @Field((type) => Number)
  percentage: number;
}

@InputType()
export class CreateEducationInput {
  @Field((type) => String)
  title: string;

  @Field((type) => Number)
  year: number;

  @Field((type) => String)
  institute: string;
}

@InputType()
export class CreateExperienceInput {
  @Field((type) => String)
  title: string;

  @Field((type) => String, { nullable: true })
  fromDate: string;

  @Field((type) => String, { nullable: true })
  toDate: string;

  @Field((type) => Boolean)
  present: boolean;

  @Field((type) => String)
  company: string;
}

@InputType()
export class CreatePortfolioInput {
  @Field((type) => String)
  title: string;

  @Field((type) => String)
  image: string;

  @Field((type) => String)
  url: string;
}

@InputType()
export class CreateExpertiseInput {
  @Field((type) => String)
  label: string;

  @Field((type) => Number)
  percentage: number;
}

@InputType()
export class CreateLanguageInput extends CreateExpertiseInput {}

@InputType()
export class CreateAwardInput {
  @Field((type) => String)
  title: string;

  @Field((type) => Number)
  year: number;

  @Field((type) => String)
  description: string;
}

@InputType()
export class CreateResumeInput {
  @Field((type) => String, { nullable: true })
  coverLetter: string;

  @Field((type) => String, { nullable: true })
  avatar: string;

  @Field((type) => [CreateMySkillInput], { nullable: true })
  skills: CreateMySkillInput[];

  @Field((type) => [CreateEducationInput], { nullable: true })
  educations: CreateEducationInput[];

  @Field((type) => [CreateExperienceInput], { nullable: true })
  experiences: CreateExperienceInput[];

  @Field((type) => [CreatePortfolioInput], { nullable: true })
  portfolios: CreatePortfolioInput[];

  @Field((type) => [CreateExpertiseInput], { nullable: true })
  expertises: CreateExpertiseInput[];

  @Field((type) => [CreateLanguageInput], { nullable: true })
  languages: CreateLanguageInput[];

  @Field((type) => [CreateAwardInput], { nullable: true })
  awards: CreateAwardInput[];
}

@ObjectType()
export class CreateResumeOutput extends BaseOutput {}
