import { Injectable } from '@angular/core';
import {
  ApolloAngularSDK, EditAwardInput,
  EditEducationInput,
  EditExperienceInput,
  EditExpertiseInput, EditLanguageInput,
  EditPortfolioInput
} from '../../../../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  resume(): any {
    return this.sdk.resume();
  }

  editAvatar(base64Image: string): any {
    return this.sdk.editAvatar({ input: { avatar: base64Image }});
  }

  editEducation(editEducationInput: EditEducationInput): any {
    return this.sdk.editEducation(editEducationInput);
  }

  editExperience(editExperienceInput: EditExperienceInput): any {
    return this.sdk.editExperience(editExperienceInput);
  }

  editPortfolio(editPortfolioInput: EditPortfolioInput): any {
    return this.sdk.editPortfolio(editPortfolioInput);
  }

  editExpertise(editExpertiseInput: EditExpertiseInput): any {
    return this.sdk.editExpertise(editExpertiseInput);
  }

  editLanguage(editLanguageInput: EditLanguageInput): any {
    return this.sdk.editLanguage(editLanguageInput);
  }

  editAward(editAwardInput: EditAwardInput): any {
    return this.sdk.editAward(editAwardInput);
  }
}
