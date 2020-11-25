import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '../jwt/jwt.service';
import { User } from './entities/user.entity';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { EditProfileInput } from './dtos/edit-profile.dto';
import {
  ChangePasswordInput,
  ChangePasswordOutput,
} from './dtos/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
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
      await this.users.save(this.users.create({ name, email, password, role }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: `Couldn't create account` };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne({ email });
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
    return await this.users.findOne({ id });
  }

  async editProfile(
    userId: number,
    { name, sex, birthDay, phone, description }: EditProfileInput,
  ): Promise<User> {
    const user = await this.users.findOne(userId);
    if (name) {
      user.name = name;
    }
    if (sex) {
      user.sex = sex;
    }
    if (birthDay) {
      user.birthDay = birthDay;
    }
    if (phone) {
      user.phone = phone;
    }
    if (description) {
      user.description = description;
    }
    return this.users.save(user);
  }

  async changePassword(
    userId: number,
    { password }: ChangePasswordInput,
  ): Promise<ChangePasswordOutput> {
    try {
      const user = await this.users.findOne(userId);
      if (password) {
        user.password = password;
      }
      await this.users.save(user);

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
}
