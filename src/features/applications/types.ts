import {Advert, IncomingAdvert} from 'reduxFeatures/adverts/types';

interface IncomingApplication {
  id: number;
  advert_id: number;
  applicant_id: number;
  status: 'active' | 'closed' | 'offered' | 'deleted';
  created_at: string;
  updated_at: string;
  advert: IncomingAdvert;
}

interface IncomingApplications {
  applications: IncomingApplication[];
}
interface Applications {
  applications: Application[];
}

interface Application {
  id: number;
  advertId: number;
  applicantId: number;
  status: 'active' | 'closed' | 'offered' | 'deleted';
  createdAt: string;
  updatedAt: string;
  advert: Advert;
}

interface ApplicationState {
  loading: boolean;
  applications: Application[];
}

export type {
  Application,
  ApplicationState,
  IncomingApplication,
  IncomingApplications,
  Applications,
};
