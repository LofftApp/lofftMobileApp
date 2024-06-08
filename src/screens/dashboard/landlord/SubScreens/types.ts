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

export type {
  AdvertApplicantWithSelected,
  SeeApplicantsScreenProp,
  SecondRoundApplicantsWithSelected,
};
