import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Resume } from './entities/resume.entity';
import { User } from '../users/entities/user.entity';
import {
  CreateResumeInput,
  CreateResumeOutput,
} from './dtos/create-resume.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { EditAvatarInput, EditAvatarOutput } from './dtos/edit-avatar.dto';
import { EditSkillInput, EditSkillOutput } from './dtos/edit-skill.dto';
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

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumes: Repository<Resume>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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
      const resume = await this.resumes.findOne({ id: 1 });

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
    { skills }: EditSkillInput,
  ): Promise<EditSkillOutput> {
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
      const resume = await this.resumes.findOne({ userId: candidate.id });

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
      const resume = await this.resumes.findOne({ userId: candidate.id });

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
      const resume = await this.resumes.findOne({ userId: candidate.id });

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
      const resume = await this.resumes.findOne({ userId: candidate.id });

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
      const resume = await this.resumes.findOne({ userId: candidate.id });

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
      const resume = await this.resumes.findOne({ userId: candidate.id });

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
}
