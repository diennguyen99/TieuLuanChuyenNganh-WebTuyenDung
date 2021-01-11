import { Inject, Injectable } from '@nestjs/common';
import got from 'got';
import * as FormData from 'form-data';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { EmailVar, MailgunModuleOptions } from './mail.interfaces';

@Injectable()
export class MailgunService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailgunModuleOptions,
  ) {}

  private async sendMail(
    subject: string,
    to: string,
    template: string,
    emailVars: EmailVar[],
  ): Promise<boolean> {
    const form = new FormData();
    form.append(
      'from',
      `Send from UteRecruitment <mailgun@${this.options.domain}`,
    );
    form.append('to', 'dienktvn0@gmail.com');
    form.append('subject', subject);
    form.append('template', template);
    emailVars.forEach((emailVar) =>
      form.append(`v:${emailVar.key}`, emailVar.value),
    );

    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendMail('Verify Your Email', email, 'verify-email', [
      { key: 'code', value: code },
    ]);
  }
}
