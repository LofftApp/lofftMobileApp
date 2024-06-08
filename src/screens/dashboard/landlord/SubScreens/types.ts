import {Advert, AdvertApplicant} from 'reduxFeatures/adverts/types';

interface AdvertApplicantWithSelected extends AdvertApplicant {
  selected: boolean;
}

interface SecondRoundApplicantsWithSelected
  extends AdvertApplicantWithSelected {
  secondRoundSelected: boolean;
}

type SeeApplicantsScreenProp = {
  route: {params: {advert: Advert}};
};

type SeeProfilesScreenProp = {
  route: {
    params: {
      secondRoundApplicants: SecondRoundApplicantsWithSelected[];
      currentAdvert: Advert;
    };
  };
};

export type {
  AdvertApplicantWithSelected,
  SeeApplicantsScreenProp,
  SecondRoundApplicantsWithSelected,
  SeeProfilesScreenProp,
};
