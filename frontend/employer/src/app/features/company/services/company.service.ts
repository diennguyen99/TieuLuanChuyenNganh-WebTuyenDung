import { Injectable } from '@angular/core';
import { ApolloAngularSDK, EditCompanyInput } from '../../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  company(): any {
    return this.sdk.company();
  }

  editCompany(editCompany: EditCompanyInput): any {
    return this.sdk.editCompany({ input: editCompany });
  }

  editLogoCompany(id: number, base64Logo: string): any {
    return this.sdk.editLogoCompany({ input: { id, base64Logo }});
  }

  editThumbnailCompany(id: number, base64Thumbnail: string): any {
    return this.sdk.editThumbnailCompany({ input: { id, base64Thumbnail }});
  }
}
