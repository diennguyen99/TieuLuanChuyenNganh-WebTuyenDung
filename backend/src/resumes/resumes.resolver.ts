import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { EditMySkillInput, EditMySkillOutput } from './dtos/edit-skill.dto';
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
import {
  CreateResumeTypeInput,
  CreateResumeTypeOutput,
} from './dtos/create-resume-type.dto';
import { ResumeType } from './entities/resume-type.entity';
import { ResumeOpen } from './entities/resume-open.entity';
import {
  EditStatusResumeOpenInput,
  EditStatusResumeOpenOutput,
} from './dtos/edit-status-resume-open.dto';
import { ResumeInput, ResumeOutput } from './dtos/resume.dto';
import {
  EditTypeResumeOpenInput,
  EditTypeResumeOpenOutput,
} from './dtos/edit-type-resume-open.dto';
import { ResumesOpenNewOutput } from './dtos/resumes-open-new.dto';
import { ResumeTypesInput, ResumeTypesOutput } from './dtos/resume-types.dto';

@Resolver((of) => Resume)
export class ResumesResolver {
  constructor(private readonly resumesService: ResumesService) {}

  @Query((returns) => ResumeOutput)
  async resume(@Args('input') resumeInput: ResumeInput): Promise<ResumeOutput> {
    return await this.resumesService.resume(resumeInput);
  }

  @Query((returns) => Resume)
  async getResume(@AuthUser() candidate: User): Promise<Resume> {
    return await this.resumesService.getResume(candidate);
  }

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

  @Mutation((returns) => EditMySkillOutput)
  async editSkill(
    @AuthUser() candidate: User,
    @Args('input') editSkillInput: EditMySkillInput,
  ): Promise<EditMySkillOutput> {
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

@Resolver((of) => ResumeType)
export class ResumeTypesResolver {
  constructor(private readonly resumesService: ResumesService) {}

  @Mutation((returns) => CreateResumeTypeOutput)
  async createResumeType(
    @AuthUser() user: User,
    @Args('input') createResumeTypeInput: CreateResumeTypeInput,
  ): Promise<CreateResumeTypeOutput> {
    return await this.resumesService.createResumeType(
      user,
      createResumeTypeInput,
    );
  }

  @Query((returns) => ResumeTypesOutput)
  async resumeTypes(
    @AuthUser() user: User,
    @Args('input') resumeTypesInput: ResumeTypesInput,
  ): Promise<ResumeTypesOutput> {
    return await this.resumesService.getResumeTypes(user, resumeTypesInput);
  }
}

@Resolver((of) => ResumeOpen)
export class ResumeOpensResolver {
  constructor(private readonly resumesService: ResumesService) {}

  @Mutation((returns) => EditTypeResumeOpenOutput)
  async editTypeResumeOpen(
    @Args('input') editTypeResumeOpenInput: EditTypeResumeOpenInput,
  ): Promise<EditTypeResumeOpenOutput> {
    return await this.resumesService.editTypeResumeOpen(
      editTypeResumeOpenInput,
    );
  }

  @Mutation((returns) => EditStatusResumeOpenOutput)
  async editStateResumeOpen(
    @Args('input') editStatusResumeOpenInput: EditStatusResumeOpenInput,
  ): Promise<EditStatusResumeOpenOutput> {
    return await this.resumesService.editStatusResumeOpen(
      editStatusResumeOpenInput,
    );
  }

  @Query((returns) => ResumesOpenNewOutput)
  async resumesOpenNew(@AuthUser() user): Promise<ResumesOpenNewOutput> {
    return this.resumesService.resumesOpenNew(user);
  }
}
