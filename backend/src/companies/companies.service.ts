import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { City } from '../cities/entities/city.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { EditCompanyInput, EditCompanyOutput } from './dtos/edit-company.dto';
import { CompanyInput, CompanyOutput } from './dtos/company.dto';
import { EditLogoInput, EditLogoOutput } from './dtos/edit-logo.dto';
import { EditThumbnailInput } from './dtos/edit-thumbnail.dto';
import { CompanyBySlugInput } from './dtos/company-by-slug.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companies: Repository<Company>,
    @InjectRepository(City)
    private readonly cities: Repository<City>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async editCompany(
    user: User,
    editCompany: EditCompanyInput,
  ): Promise<EditCompanyOutput> {
    try {
      const company = await this.companies.findOne({
        relations: ['user', 'city'],
        where: {
          id: editCompany.id,
        },
      });

      if (!company) {
        return {
          ok: false,
          error: 'Company not found',
        };
      }

      if (company.user.id !== user.id) {
        return {
          ok: false,
          error: `You can't edit a company that you don't own`,
        };
      }

      // Add city
      const city = await this.cities.findOne({
        slug: editCompany.citySlug,
      });
      if (!city) {
        return {
          ok: false,
          error: 'City not found',
        };
      }

      if (company.name !== editCompany.name) {
        company.name = editCompany.name;
      }
      if (company.description !== editCompany.description) {
        company.description = editCompany.description;
      }
      if (company.phone !== editCompany.phone) {
        company.phone = editCompany.phone;
      }
      if (company.website !== editCompany.website) {
        company.website = editCompany.website;
      }
      if (company.facebook !== editCompany.facebook) {
        company.facebook = editCompany.facebook;
      }
      if (company.foundedYear !== editCompany.foundedYear) {
        company.foundedYear = editCompany.foundedYear;
      }
      if (company.companySize !== editCompany.companySize) {
        company.companySize = editCompany.companySize;
      }
      if (company.averageAge !== editCompany.averageAge) {
        company.averageAge = editCompany.averageAge;
      }
      if (company.address !== editCompany.address) {
        company.address = editCompany.address;
      }
      if (!company.city || company.city.id !== city.id) {
        company.city = city;
      }

      await this.companies.save(company);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async getCompany({ id }: CompanyInput): Promise<CompanyOutput> {
    try {
      const company = await this.companies.findOne({
        relations: ['city', 'jobs'],
        where: {
          id,
        },
      });

      if (!company) {
        return {
          ok: false,
          error: 'Company not found',
        };
      }

      return {
        ok: true,
        company,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load company',
      };
    }
  }

  async getCompanyByEmployer(user: User): Promise<CompanyOutput> {
    try {
      const company = await this.companies.findOne({
        relations: ['user', 'city'],
        where: {
          user: user.id,
        },
      });

      if (!company) {
        return {
          ok: false,
          error: 'Company not found',
        };
      }

      return {
        ok: true,
        company,
      };
    } catch {
      return {
        ok: false,
        error: 'Could load company',
      };
    }
  }
  async editLogo(
    user: User,
    { id, base64Logo }: EditLogoInput,
  ): Promise<EditLogoOutput> {
    try {
      const company = await this.companies.findOne({ id });

      if (!company) {
        return {
          ok: false,
          error: 'Company not found',
        };
      }

      const urlLogo = await this.cloudinaryService.uploadLogoCompany(
        base64Logo,
      );

      company.logo = urlLogo;
      await this.companies.save(company);

      return {
        ok: true,
        url: urlLogo,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editThumbnail(
    user: User,
    { id, base64Thumbnail }: EditThumbnailInput,
  ): Promise<EditLogoOutput> {
    try {
      const company = await this.companies.findOne({ id });

      if (!company) {
        return {
          ok: false,
          error: 'Company not found',
        };
      }

      const urlThumbnail = await this.cloudinaryService.uploadThumbnailCompany(
        base64Thumbnail,
      );

      company.thumbnail = urlThumbnail;
      await this.companies.save(company);

      return {
        ok: true,
        url: urlThumbnail,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit thubnail',
      };
    }
  }

  async getCompanyBySlug({ slug }: CompanyBySlugInput): Promise<CompanyOutput> {
    try {
      const company = await this.companies.findOne({
        relations: ['jobs'],
        where: {
          slug,
        },
      });

      if (!company) {
        return {
          ok: true,
          error: 'Company not found',
        };
      }

      return {
        ok: true,
        company,
      };
    } catch {
      return {
        ok: false,
        error: 'Load company error!',
      };
    }
  }
}
