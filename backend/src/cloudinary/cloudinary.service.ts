import { Inject, Injectable } from '@nestjs/common';
import * as Cloudinary from 'cloudinary';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { CloudinaryModuleOptions } from './cloudinary.interfaces';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: CloudinaryModuleOptions,
  ) {}

  async uploadAvatar(image: string): Promise<string> {
    const res = await Cloudinary.v2.uploader.upload(image, {
      api_key: this.options.apiKey,
      api_secret: this.options.apiSecret,
      cloud_name: this.options.cloudName,
      folder: 'Blog_Assets/',
      transformation: {
        width: 300,
        height: 300,
      },
    });
    return res.secure_url;
  }

  async uploadLogoCompany(image: string): Promise<string> {
    const res = await Cloudinary.v2.uploader.upload(image, {
      api_key: this.options.apiKey,
      api_secret: this.options.apiSecret,
      cloud_name: this.options.cloudName,
      folder: 'Blog_Assets/',
      transformation: {
        width: 256,
        height: 256,
      },
    });
    return res.secure_url;
  }

  async uploadThumbnailCompany(image: string): Promise<string> {
    const res = await Cloudinary.v2.uploader.upload(image, {
      api_key: this.options.apiKey,
      api_secret: this.options.apiSecret,
      cloud_name: this.options.cloudName,
      folder: 'Blog_Assets/',
      transformation: {
        width: 1600,
        height: 680,
      },
    });
    return res.secure_url;
  }

  async uploadCV(file: string): Promise<string> {
    try {
      const res = await Cloudinary.v2.uploader.upload(file, {
        api_key: this.options.apiKey,
        api_secret: this.options.apiSecret,
        cloud_name: this.options.cloudName,
        folder: 'cv/',
        resource_type: 'raw',
        format: 'docx',
      });

      return res.secure_url;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
