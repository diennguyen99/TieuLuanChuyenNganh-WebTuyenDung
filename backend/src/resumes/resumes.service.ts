import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Resume } from './entities/resume.entity';
import { User } from '../users/entities/user.entity';
import { ResumeType } from './entities/resume-type.entity';
import {
  CreateResumeInput,
  CreateResumeOutput,
} from './dtos/create-resume.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { EditAvatarInput, EditAvatarOutput } from './dtos/edit-avatar.dto';
import { EditMySkillInput, EditMySkillOutput } from './dtos/edit-skill.dto';
import {
  EditEducationInput,
  EditEducationOutput,
} from './dtos/edit-education.dto';
import {
  EditExperienceInput,
  EditExperienceOutput,
} from './dtos/edit-experience.dto';
import { EditPortfolioInput } from './dtos/edit-portfolio.dto';
import { EditPackageOutput } from '../packages/dtos/edit-package.dto';
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
import {
  EditStatusResumeOpenInput,
  EditStatusResumeOpenOutput,
} from './dtos/edit-status-resume-open.dto';
import { ResumeOpen } from './entities/resume-open.entity';
import { ResumeInput, ResumeOutput } from './dtos/resume.dto';
import {
  EditTypeResumeOpenInput,
  EditTypeResumeOpenOutput,
} from './dtos/edit-type-resume-open.dto';
import { ResumesOpenNewOutput } from './dtos/resumes-open-new.dto';
import { ResumeTypesInput, ResumeTypesOutput } from './dtos/resume-types.dto';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumes: Repository<Resume>,
    @InjectRepository(ResumeType)
    private readonly resumeTypes: Repository<ResumeType>,
    @InjectRepository(ResumeOpen)
    private readonly resumeOpens: Repository<ResumeOpen>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async resume({ id }: ResumeInput): Promise<ResumeOutput> {
    const resume = await this.resumes.findOne({ id });
    if (!resume) {
      return {
        ok: false,
        error: 'Resume not found',
      };
    }

    return {
      ok: true,
      resume,
    };
  }

  async getResume(candidate: User): Promise<Resume> {
    const resume = await this.resumes.findOne({ user: candidate });
    if (resume) {
      return resume;
    }
    const newResume = await this.resumes.create({ user: candidate });
    return await this.resumes.save(newResume);
  }

  async createResume(
    candidate: User,
    createResumeInput: CreateResumeInput,
  ): Promise<CreateResumeOutput> {
    try {
      // upload avatar
      if (createResumeInput.avatar) {
        createResumeInput.avatar = await this.cloudinaryService.uploadAvatar(
          createResumeInput.avatar,
        );
      }

      const newResume = await this.resumes.create(createResumeInput);

      newResume.user = candidate;
      await this.resumes.save(newResume);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not create resume',
      };
    }
  }

  async editAvatar(
    candidate: User,
    { avatar }: EditAvatarInput,
  ): Promise<EditAvatarOutput> {
    try {
      const resume = await this.resumes.findOne({ user: candidate });

      if (avatar) {
        resume.avatar = await this.cloudinaryService.uploadAvatar(avatar);
      }
      await this.resumes.save(resume);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit avatar',
      };
    }
  }

  async editSkill(
    candidate: User,
    { skills }: EditMySkillInput,
  ): Promise<EditMySkillOutput> {
    try {
      const resume = await this.resumes.findOne({ userId: candidate.id });

      if (skills) {
        resume.skills = skills;
      }
      await this.resumes.save(resume);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit skill',
      };
    }
  }

  async editEducation(
    candidate: User,
    { educations }: EditEducationInput,
  ): Promise<EditEducationOutput> {
    try {
      const resume = await this.resumes.findOne({ user: candidate });

      if (educations) {
        resume.educations = educations;
      }
      await this.resumes.save(resume);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit education',
      };
    }
  }

  async editExperience(
    candidate: User,
    { experiences }: EditExperienceInput,
  ): Promise<EditExperienceOutput> {
    try {
      const resume = await this.resumes.findOne({ user: candidate });

      if (experiences) {
        resume.experiences = experiences;
      }
      await this.resumes.save(resume);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit experience',
      };
    }
  }

  async editPortfolio(
    candidate: User,
    { portfolios }: EditPortfolioInput,
  ): Promise<EditPackageOutput> {
    try {
      const resume = await this.resumes.findOne({ user: candidate });

      if (portfolios) {
        resume.portfolios = portfolios;
      }
      await this.resumes.save(resume);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit portfolio',
      };
    }
  }

  async editExpertise(
    candidate: User,
    { expertises }: EditExpertiseInput,
  ): Promise<EditExpertiseOutput> {
    try {
      const resume = await this.resumes.findOne({ user: candidate });

      if (expertises) {
        resume.expertises = expertises;
      }
      await this.resumes.save(resume);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit expertise',
      };
    }
  }

  async editLanguage(
    candidate: User,
    { languages }: EditLanguageInput,
  ): Promise<EditLanguageOutput> {
    try {
      const resume = await this.resumes.findOne({ user: candidate });

      if (languages) {
        resume.languages = languages;
      }
      await this.resumes.save(resume);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit language',
      };
    }
  }

  async editAward(
    candidate: User,
    { awards }: EditAwardInput,
  ): Promise<EditAwardOutput> {
    try {
      const resume = await this.resumes.findOne({ user: candidate });

      if (awards) {
        resume.awards = awards;
      }
      await this.resumes.save(resume);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit award',
      };
    }
  }

  async createResumeType(
    user: User,
    { name }: CreateResumeTypeInput,
  ): Promise<CreateResumeTypeOutput> {
    try {
      const newJobType = this.resumeTypes.create({ name, user });
      await this.resumeTypes.save(newJobType);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getResumeTypes(
    user: User,
    { page }: ResumeTypesInput,
  ): Promise<ResumeTypesOutput> {
    try {
      const [resumeTypes, totalResults] = await this.resumeTypes.findAndCount({
        where: {
          user: user.id,
        },
        order: {
          createdAt: 'DESC',
        },
        take: 2,
        skip: (page - 1) * 2,
      });
      return {
        ok: true,
        totalResults,
        totalPages: Math.ceil(totalResults / 2),
        resumeTypes,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editTypeResumeOpen({
    id,
    idResumeType,
  }: EditTypeResumeOpenInput): Promise<EditTypeResumeOpenOutput> {
    try {
      const resumeOpen = await this.resumeOpens.findOne({ id });
      if (resumeOpen) {
        return {
          ok: false,
          error: 'Resume not found',
        };
      }

      const resumeType = await this.resumeTypes.findOne({ id: idResumeType });
      if (resumeType) {
        return {
          ok: false,
          error: 'Resume Type not found',
        };
      }

      resumeOpen.resumeType = resumeType;
      await this.resumeOpens.save(resumeOpen);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editStatusResumeOpen({
    id,
    resumeStatus,
  }: EditStatusResumeOpenInput): Promise<EditStatusResumeOpenOutput> {
    try {
      const resumeOpen = await this.resumeOpens.findOne({ id });
      if (!resumeOpen) {
        return {
          ok: false,
          error: 'Resume not found',
        };
      }

      resumeOpen.resumeStatus = resumeStatus;
      await this.resumeOpens.save(resumeOpen);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async resumesOpenNew(user: User): Promise<ResumesOpenNewOutput> {
    try {
      const resumesOpen = await this.resumeOpens.find({
        relations: ['resume', 'user', 'resumeType'],
        where: {
          user: user.id,
        },
      });

      return {
        ok: true,
        resumesOpen,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
