import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap, switchMap, tap } from 'rxjs/operators';
import {Award, Education, Experience, Expertise, Language, Portfolio, Resume} from '../../../../../../generated/graphql';
import { ResumeService } from '../services';

interface ResumeState {
  loading: boolean;
  resume: Resume;
}

@Injectable({ providedIn: 'root' })
export class ResumeStore extends ComponentStore<ResumeState> {
  readonly resume$ = this.select((s) => s.resume);
  readonly loading$ = this.select((s) => s.loading);

  readonly vm$ = this.select(this.resume$, this.loading$, (resume, loading) => ({
    resume,
    loading
  }));

  constructor(
    private readonly resumeService: ResumeService
  ) {
    super({ loading: false, resume: null });
  }

  readonly getResumeEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.resumeService.resume().pipe(
          tapResponse(({ data }) => {
            if (data?.getResume) {
              this.patchState({
                loading: false,
                resume: data.getResume
              });
            }
          }, console.error)
        )
      )
    )
  );

  readonly editAvatarEffect = this.effect<string>((newImage$) =>
    newImage$.pipe(
      exhaustMap((newImage) => {
          this.patchState((state) => ({
            resume: {
              ...state.resume,
              avatar: newImage
            }
          }));
          return this.resumeService.editAvatar(newImage).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                resume: {
                  ...state.resume,
                }
              }));
            }, console.error)
          );
        }
      )
    )
  );

  readonly editEducationEffect = this.effect<Education[]>((newEducations$) =>
    newEducations$.pipe(
      exhaustMap((newEducations) => {
          return this.resumeService.editEducation({ educations: newEducations }).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                resume: {
                  ...state.resume,
                  educations: newEducations,
                }
              }));
            }, console.error)
          );
        }
      )
    )
  );

  readonly editExperienceEffect = this.effect<Experience[]>((newExperience$) =>
    newExperience$.pipe(
      exhaustMap((newExperiences) => {
          return this.resumeService.editExperience({ experiences: newExperiences }).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                resume: {
                  ...state.resume,
                  experiences: newExperiences,
                }
              }));
            }, console.error)
          );
        }
      )
    )
  );

  readonly editPortfolioEffect = this.effect<Portfolio[]>((newPortfolio$) =>
    newPortfolio$.pipe(
      exhaustMap((newPortfolios) => {
          return this.resumeService.editPortfolio({ portfolios: newPortfolios }).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                resume: {
                  ...state.resume,
                  portfolios: newPortfolios,
                }
              }));
            }, console.error)
          );
        }
      )
    )
  );

  readonly editExpertiseEffect = this.effect<Expertise[]>((newExpertise$) =>
    newExpertise$.pipe(
      exhaustMap((newExpertises) => {
          return this.resumeService.editExpertise({ expertises: newExpertises }).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                resume: {
                  ...state.resume,
                  expertises: newExpertises,
                }
              }));
            }, console.error)
          );
        }
      )
    )
  );

  readonly editLanguageEffect = this.effect<Language[]>((newLanguage$) =>
    newLanguage$.pipe(
      exhaustMap((newLanguages) => {
          return this.resumeService.editLanguage({ languages: newLanguages }).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                resume: {
                  ...state.resume,
                  languages: newLanguages,
                }
              }));
            }, console.error)
          );
        }
      )
    )
  );

  readonly editAwardEffect = this.effect<Award[]>((newAward$) =>
    newAward$.pipe(
      exhaustMap((newAwards) => {
          return this.resumeService.editAward({ awards: newAwards }).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                resume: {
                  ...state.resume,
                  awards: newAwards,
                }
              }));
            }, console.error)
          );
        }
      )
    )
  );
}
