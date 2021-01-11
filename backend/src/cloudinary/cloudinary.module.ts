import { DynamicModule, Global, Module } from '@nestjs/common';
import { CloudinaryModuleOptions } from './cloudinary.interfaces';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { CloudinaryService } from './cloudinary.service';

@Module({})
@Global()
export class CloudinaryModule {
  static forRoot(options: CloudinaryModuleOptions): DynamicModule {
    return {
      module: CloudinaryModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        CloudinaryService,
      ],
      exports: [CloudinaryService],
    };
  }
}
