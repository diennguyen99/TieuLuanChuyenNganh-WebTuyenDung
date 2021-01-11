import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { City } from './entities/city.entity';
import { CitiesService } from './cities.service';
import { CitiesResolver } from './cities.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CitiesService, CitiesResolver],
})
export class CitiesModule {}
