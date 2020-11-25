import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Package } from './entities/package.entity';
import { PackageService } from './package.service';
import {
  CreatePackageInput,
  CreatePackageOutput,
} from './dtos/create-package.dto';
import { EditPackageInput, EditPackageOutput } from './dtos/edit-package.dto';
import { PackagesOutput } from './dtos/packages.dto';

@Resolver((of) => Package)
export class PackagesResolver {
  constructor(private readonly packagesService: PackageService) {}

  @Mutation((returns) => CreatePackageOutput)
  async createPackage(
    @Args('input') createPackageInput: CreatePackageInput,
  ): Promise<CreatePackageOutput> {
    return await this.packagesService.createPackage(createPackageInput);
  }

  @Mutation((returns) => EditPackageOutput)
  async editPackage(
    @Args('input') editPackageInput: EditPackageInput,
  ): Promise<EditPackageOutput> {
    return await this.packagesService.editPackage(editPackageInput);
  }

  @Query((returns) => PackagesOutput)
  async packages(): Promise<PackagesOutput> {
    return await this.packagesService.allPackages();
  }
}
