import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';
import {
  CreatePackageInput,
  CreatePackageOutput,
} from './dtos/create-package.dto';
import { EditPackageInput, EditPackageOutput } from './dtos/edit-package.dto';
import { PackagesOutput } from './dtos/packages.dto';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly packages: Repository<Package>,
  ) {}

  async createPackage(
    createPackageInput: CreatePackageInput,
  ): Promise<CreatePackageOutput> {
    try {
      const newPackage = this.packages.create(createPackageInput);
      await this.packages.save(newPackage);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not create package',
      };
    }
  }

  async editPackage(
    editPackageInput: EditPackageInput,
  ): Promise<EditPackageOutput> {
    try {
      const packageDb = await this.packages.findOne(editPackageInput.packageId);
      if (!packageDb) {
        return {
          ok: false,
          error: 'Package not found',
        };
      }
    } catch {
      return {
        ok: false,
        error: 'Could not edit package',
      };
    }
  }

  async allPackages(): Promise<PackagesOutput> {
    try {
      const packages = await this.packages.find();
      return {
        ok: true,
        results: packages,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load packages',
      };
    }
  }
}
