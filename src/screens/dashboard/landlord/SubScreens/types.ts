import {Advert, AdvertApplicant} from 'reduxFeatures/adverts/types';

interface AdvertApplicantWithSelected extends AdvertApplicant {
  selected: boolean;
}

type SeeApplicantsScreenProp = {
  route: {params: {advert: Advert}};
};

export type {AdvertApplicantWithSelected, SeeApplicantsScreenProp};
