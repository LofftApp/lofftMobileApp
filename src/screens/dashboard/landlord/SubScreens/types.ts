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
  route: {params: {id: number}};
};

type SeeProfilesScreenProp = {};

export type {
  AdvertApplicantWithSelected,
  SeeApplicantsScreenProp,
  SecondRoundApplicantWithSelected,
  SeeProfilesScreenProp,
};
