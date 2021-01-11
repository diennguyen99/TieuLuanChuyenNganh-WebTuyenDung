import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { School } from './entities/school.entity';
import { ResumePropertiesService } from './resume-properties.service';
import {
  CreateSchoolInput,
  CreateSchoolOutput,
} from './dtos/create-school.dto';
import { EditSchoolInput, EditSchoolOutput } from './dtos/edit-school.dto';
import {
  DeleteSchoolInput,
  DeleteSchoolOutput,
} from './dtos/delete-school.dto';
import { SchoolsOutput } from './dtos/schools.dto';
import {
  AdminSchoolsInput,
  AdminSchoolsOutput,
} from './dtos/admin-schools.dto';

@Resolver((of) => School)
export class ResumePropertiesResolver {
  constructor(private readonly educationsService: ResumePropertiesService) {}

  @Mutation((returns) => CreateSchoolOutput)
  async createSchool(
    @Args('input') createSchoolInput: CreateSchoolInput,
  ): Promise<CreateSchoolOutput> {
    return await this.educationsService.createSchool(createSchoolInput);
  }

  @Mutation((returns) => EditSchoolOutput)
  async editSchool(
    @Args('input') editSchoolInput: EditSchoolInput,
  ): Promise<EditSchoolOutput> {
    return await this.educationsService.editSchool(editSchoolInput);
  }

  @Mutation((returns) => DeleteSchoolOutput)
  async deleteSchool(
    @Args('input') editSchoolInput: DeleteSchoolInput,
  ): Promise<DeleteSchoolOutput> {
    return await this.educationsService.deleteSchool(editSchoolInput);
  }

  @Query((returns) => SchoolsOutput)
  async schools(): Promise<SchoolsOutput> {
    return await this.educationsService.getSchools();
  }

  @Query((returns) => AdminSchoolsOutput)
  async adminSchools(
    @Args('input') adminSchoolsInput: AdminSchoolsInput,
  ): Promise<AdminSchoolsOutput> {
    return await this.educationsService.adminGetSchools(adminSchoolsInput);
  }
}
