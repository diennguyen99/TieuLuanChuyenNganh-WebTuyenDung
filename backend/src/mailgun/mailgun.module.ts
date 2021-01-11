import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { MailgunModuleOptions } from './mail.interfaces';
import { MailgunService } from './mailgun.service';

@Module({})
@Global()
export class MailgunModule {
  static forRoot(options: MailgunModuleOptions): DynamicModule {
    return {
      module: MailgunModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        MailgunService,
      ],
      exports: [MailgunService],
    };
  }
}
