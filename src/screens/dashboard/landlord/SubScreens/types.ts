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

type SelectionConfirmedScreenProp = {
  route: {params: {advertId: number; round1?: boolean; round2?: boolean}};
};

export type {
  AdvertApplicantWithSelected,
  SeeApplicantsScreenProp,
  SecondRoundApplicantWithSelected,
  SeeProfilesScreenProp,
  SelectionConfirmedScreenProp,
};
