import {
  Advert,
  AdvertApplicant,
  IncomingAdvert,
  IncomingAdvertApplicant,
} from 'reduxFeatures/adverts/types';

interface IncomingApplication {
  id: number;
  advert_id: number;
  applicant_id: number;
  status: 'active' | 'closed' | 'offered' | 'deleted';
  created_at: string;
  updated_at: string;
  round_1: boolean;
  round_2: boolean;
  round_3: boolean;
  advert?: IncomingAdvert;
  applicant?: IncomingAdvertApplicant;
}

interface IncomingApplications {
  applications: IncomingApplication[];
}

interface IncomingAdvertWithApplications {
  advert: IncomingAdvert & {
    applications: IncomingApplication[];
  };
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
  round1: boolean;
  round2: boolean;
  round3: boolean;
  advert?: Advert;
  applicant?: AdvertApplicant;
}

interface AdvertWithApplications {
  advert: Advert & {
    applications: Application[];
  };
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
  IncomingAdvertWithApplications,
  AdvertWithApplications,
};
