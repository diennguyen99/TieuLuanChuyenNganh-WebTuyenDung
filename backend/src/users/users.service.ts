import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '../jwt/jwt.service';
import { User, UserRole } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import {
  ChangePasswordInput,
  ChangePasswordOutput,
} from './dtos/change-password.dto';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import { MailgunService } from '../mailgun/mailgun.service';
import { City } from '../cities/entities/city.entity';
import { JobType } from '../jobs/entities/job-type.entity';
import { JobSector } from '../jobs/entities/job-sector.entity';
import { Company } from '../companies/entities/company.entity';
import { Resume } from '../resumes/entities/resume.entity';
import { JobPosition } from '../jobs/entities/job-position.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly mailService: MailgunService,
    @InjectRepository(City)
    private readonly cities: Repository<City>,
    @InjectRepository(JobPosition)
    private readonly jobPositionsService: Repository<JobPosition>,
    @InjectRepository(JobType)
    private readonly jobTypesService: Repository<JobType>,
    @InjectRepository(JobSector)
    private readonly jobSectorsService: Repository<JobSector>,
    @InjectRepository(Company)
    private readonly companiesService: Repository<Company>,
    @InjectRepository(Resume)
    private readonly resumesService: Repository<Resume>,
  ) {}

  async createAccount({
    name,
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      const user = await this.users.save(
        this.users.create({ name, email, password, role }),
      );
      const verification = await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );

      // send mail verification
      await this.mailService.sendVerificationEmail(
        user.email,
        verification.code,
      );

      // create resume if role= Candidate
      if (user.role === UserRole.Candidate) {
        const resume = this.resumesService.create({});
        resume.user = user;
        await this.resumesService.save(resume);
      }

      // create company if role= Employer
      if (user.role === UserRole.Employer) {
        const company = this.companiesService.create({});
        company.user = user;
        await this.companiesService.save(company);
      }

      return { ok: true };
    } catch (e) {
      return { ok: false, error: e };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }

      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<User> {
    return await this.users.findOne(
      { id },
      { relations: ['city', 'jobType', 'jobSector', 'jobPosition'] },
    );
  }

  async editProfile(
    userId: number,
    editProfile: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne({ id: userId });

      if (editProfile.name !== user.name) {
        user.name = editProfile.name;
      }
      if (editProfile.sex !== user.sex) {
        user.sex = editProfile.sex;
      }
      if (editProfile.birthDay !== user.birthDay) {
        user.birthDay = editProfile.birthDay;
      }
      if (editProfile.phone !== user.phone) {
        user.phone = editProfile.phone;
      }
      if (editProfile.address !== user.address) {
        user.address = editProfile.address;
      }
      if (editProfile.description !== user.description) {
        user.description = editProfile.description;
      }

      user.jobType = await this.jobTypesService.findOne({
        slug: editProfile.jobTypeSlug,
      });

      user.jobSector = await this.jobSectorsService.findOne({
        slug: editProfile.jobSectorSlug,
      });

      user.city = await this.cities.findOne({
        slug: editProfile.citySlug,
      });

      user.jobPosition = await this.jobPositionsService.findOne({
        slug: editProfile.jobPositionSlug,
      });

      await this.users.save(user);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not edit profile',
      };
    }
  }

  async changePassword(
    userId: number,
    { oldPassword, newPassword }: ChangePasswordInput,
  ): Promise<ChangePasswordOutput> {
    try {
      const user = await this.users.findOne(
        { id: userId },
        { select: ['id', 'password'] },
      );

      const passwordCorrect = await user.checkPassword(oldPassword);

      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Old password is wrong!',
        };
      }

      user.password = newPassword;
      await this.users.save(user);

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'An error occurred. Please come back later!',
      };
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verifications.findOne(
        { code },
        { relations: ['user'] },
      );
      if (verification) {
        verification.user.verified = true;
        await this.users.save(verification.user);
        await this.verifications.delete(verification.id);
        return { ok: true };
      }
      return { ok: false, error: 'Verification not found' };
    } catch (e) {
      return { ok: false };
    }
  }
}
