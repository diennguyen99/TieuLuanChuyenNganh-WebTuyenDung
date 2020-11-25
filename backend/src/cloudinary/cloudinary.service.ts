import { Inject, Injectable } from '@nestjs/common';
import * as Cloudinary from 'cloudinary';
import { CONFIG_OPTIONS } from './cloudinary.constants';
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
}
