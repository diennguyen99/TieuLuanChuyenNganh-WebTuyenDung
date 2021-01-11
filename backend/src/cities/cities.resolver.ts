import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { City } from './entities/city.entity';
import { CitiesService } from './cities.service';
import { CreateCityInput, CreateCityOutput } from './dtos/create-city.dto';
import { CitiesOutput } from './entities/cities.dto';
import { EditCityInput, EditCityOutput } from './dtos/edit-city.dto';
import { DeleteCityInput, DeleteCityOutput } from './dtos/delete-city.dto';

@Resolver((of) => City)
export class CitiesResolver {
  constructor(private readonly citiesService: CitiesService) {}

  @Mutation((returns) => CreateCityOutput)
  async createCity(
    @Args('input') createCityInput: CreateCityInput,
  ): Promise<CreateCityOutput> {
    return this.citiesService.createCity(createCityInput);
  }

  @Mutation((returns) => EditCityOutput)
  async editCity(
    @Args('input') editCityInput: EditCityInput,
  ): Promise<EditCityOutput> {
    return this.citiesService.editCity(editCityInput);
  }

  @Mutation((returns) => DeleteCityOutput)
  async deleteCity(
    @Args('input') deleteCityInput: DeleteCityInput,
  ): Promise<DeleteCityOutput> {
    return this.citiesService.deleteCity(deleteCityInput);
  }

  @Query((returns) => CitiesOutput)
  async allCities(): Promise<CitiesOutput> {
    return this.citiesService.allCities();
  }
}
