import {Advert, AdvertApplicant} from 'reduxFeatures/adverts/types';

interface AdvertApplicantWithSelected extends AdvertApplicant {
  selected: boolean;
}

interface SecondRoundApplicantWithSelected extends AdvertApplicantWithSelected {
  secondRoundSelected: boolean;
}

type SeeApplicantsScreenProp = {
  route: {params: {id: number}};
};

type SeeProfilesScreenProp = {
  route: {
    params: {
      secondRoundApplicants:
        | AdvertApplicantWithSelected[]
        | SecondRoundApplicantWithSelected[];
      currentAdvert: Advert;
    };
  };
};

export type {
  AdvertApplicantWithSelected,
  SeeApplicantsScreenProp,
  SecondRoundApplicantWithSelected,
  SeeProfilesScreenProp,
};
