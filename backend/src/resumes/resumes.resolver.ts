import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Resume } from './entities/resume.entity';
import { ResumesService } from './resumes.service';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { EditAvatarInput, EditAvatarOutput } from './dtos/edit-avatar.dto';
import {
  CreateResumeInput,
  CreateResumeOutput,
} from './dtos/create-resume.dto';
import {
  EditEducationInput,
  EditEducationOutput,
} from './dtos/edit-education.dto';
import { EditSkillInput, EditSkillOutput } from './dtos/edit-skill.dto';
import {
  EditExperienceInput,
  EditExperienceOutput,
} from './dtos/edit-experience.dto';
import {
  EditPortfolioInput,
  EditPortfolioOutput,
} from './dtos/edit-portfolio.dto';
import {
  EditExpertiseInput,
  EditExpertiseOutput,
} from './dtos/edit-expertise.dto';
import {
  EditLanguageInput,
  EditLanguageOutput,
} from './dtos/edit-language.dto';
import { EditAwardInput, EditAwardOutput } from './dtos/edit-award.dto';

@Resolver((of) => Resume)
export class ResumesResolver {
  constructor(private readonly resumesService: ResumesService) {}

  @Mutation((returns) => CreateResumeOutput)
  async createResume(
    @AuthUser() candidate: User,
    @Args('input') createResumeInput: CreateResumeInput,
  ): Promise<CreateResumeOutput> {
    return await this.resumesService.createResume(candidate, createResumeInput);
  }

  @Mutation((returns) => EditAvatarOutput)
  async editAvatar(
    @AuthUser() candidate: User,
    @Args('input') editAvatarInput: EditAvatarInput,
  ): Promise<EditAvatarOutput> {
    return await this.resumesService.editAvatar(candidate, editAvatarInput);
  }

  @Mutation((returns) => EditSkillOutput)
  async editSkill(
    @AuthUser() candidate: User,
    @Args('input') editSkillInput: EditSkillInput,
  ): Promise<EditSkillOutput> {
    return await this.resumesService.editSkill(candidate, editSkillInput);
  }

  @Mutation((returns) => EditEducationOutput)
  async editEducation(
    @AuthUser() candidate: User,
    @Args('input') editEducationInput: EditEducationInput,
  ): Promise<EditEducationOutput> {
    return await this.resumesService.editEducation(
      candidate,
      editEducationInput,
    );
  }

  @Mutation((returns) => EditExperienceOutput)
  async editExperience(
    @AuthUser() candidate: User,
    @Args('input') editExperienceInput: EditExperienceInput,
  ): Promise<EditExperienceOutput> {
    return await this.resumesService.editExperience(
      candidate,
      editExperienceInput,
    );
  }

  @Mutation((returns) => EditPortfolioOutput)
  async editPortfolio(
    @AuthUser() candidate: User,
    @Args('input') editPortfolioInput: EditPortfolioInput,
  ): Promise<EditPortfolioOutput> {
    return await this.resumesService.editPortfolio(
      candidate,
      editPortfolioInput,
    );
  }

  @Mutation((returns) => EditExpertiseOutput)
  async editExpertise(
    @AuthUser() candidate: User,
    @Args('input') editExpertiseInput: EditExpertiseInput,
  ): Promise<EditExpertiseOutput> {
    return await this.resumesService.editExpertise(
      candidate,
      editExpertiseInput,
    );
  }

  @Mutation((returns) => EditLanguageOutput)
  async editLanguage(
    @AuthUser() candidate: User,
    @Args('input') editLanguageInput: EditLanguageInput,
  ): Promise<EditLanguageOutput> {
    return await this.resumesService.editLanguage(candidate, editLanguageInput);
  }

  @Mutation((returns) => EditAwardOutput)
  async editAward(
    @AuthUser() candidate: User,
    @Args('input') editAwardInput: EditAwardInput,
  ): Promise<EditAwardOutput> {
    return await this.resumesService.editAward(candidate, editAwardInput);
  }
}
