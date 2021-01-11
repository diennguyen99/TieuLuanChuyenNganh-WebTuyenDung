import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { ERROR_MESSAGE } from '../common/common.constants';
import { CreateCityInput, CreateCityOutput } from './dtos/create-city.dto';
import { CitiesOutput } from './entities/cities.dto';
import { EditCityInput, EditCityOutput } from './dtos/edit-city.dto';
import { DeleteCityInput, DeleteCityOutput } from './dtos/delete-city.dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cities: Repository<City>,
  ) {}

  async createCity(
    createCityInput: CreateCityInput,
  ): Promise<CreateCityOutput> {
    try {
      const newCity = this.cities.create(createCityInput);
      const city = await this.cities.save(newCity);
      return {
        ok: true,
        id: city.id,
      };
    } catch (error) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async editCity({ id, name }: EditCityInput): Promise<EditCityOutput> {
    try {
      const city = await this.cities.findOne({ id });
      if (!city) {
        return {
          ok: false,
          error: 'City not found',
        };
      }

      city.name = name;
      await this.cities.save(city);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async deleteCity({ id }: DeleteCityInput): Promise<DeleteCityOutput> {
    try {
      const city = await this.cities.findOne({ id });
      if (!city) {
        return {
          ok: false,
          error: 'City not found',
        };
      }

      await this.cities.delete(id);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }

  async allCities(): Promise<CitiesOutput> {
    try {
      const cities = await this.cities.find();
      return {
        ok: true,
        cities,
      };
    } catch (error) {
      return {
        ok: false,
        error: ERROR_MESSAGE,
      };
    }
  }
}
