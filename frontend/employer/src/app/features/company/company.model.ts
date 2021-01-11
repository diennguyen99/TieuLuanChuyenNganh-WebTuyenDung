import { City } from '../../core/models/city.model';

export interface Company {
  id: number;
  name: string;
  phone: string;
  logo: string;
  thumbnail: string;
  description: string;
  website: string;
  facebook: string;
  address: string;
  foundedYear: number;
  companySize: number;
  averageAge: number;
  point: number;
  city: City;
}
