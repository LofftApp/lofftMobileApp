import {AdvertApplicant} from 'reduxFeatures/adverts/types';

interface AdvertApplicantWithSelected {
  applicant: {
    applicant: AdvertApplicant;
    selected: boolean;
  };
}
interface SecondRoundApplicantWithSelected extends AdvertApplicantWithSelected {
  secondRoundSelected: boolean;
}

type SeeApplicantsScreenProp = {
  route: {params: {advertId: number}};
};

type SeeProfilesScreenProp = {
  route: {params: {advertId: number}};
};

export type {
  AdvertApplicantWithSelected,
  SeeApplicantsScreenProp,
  SecondRoundApplicantWithSelected,
  SeeProfilesScreenProp,
};
