import type {Advert} from 'reduxFeatures/adverts/types';
import type {SecondRoundApplicantWithSelected} from 'screens/dashboard/landlord/SubScreens/types';

type ApplicantProfileScreenProps = {
  route: {
    params: {
      applicantName: string | undefined;
      handleClickCheckbox: () => void;
      secondRoundProfile: SecondRoundApplicantWithSelected;
      currentAdvert: Advert;
    };
  };
};
export type {ApplicantProfileScreenProps};
