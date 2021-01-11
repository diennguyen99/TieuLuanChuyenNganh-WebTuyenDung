export interface MailgunModuleOptions {
  apiKey: string;
  domain: string;
  fromEmail: string;
}

export interface EmailVar {
  key: string;
  value: string;
}
