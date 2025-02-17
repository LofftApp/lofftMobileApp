import {Advert, AdvertApplicant} from 'reduxFeatures/adverts/types';

interface Applications {
  applications: Application[];
}
enum ApplicationStatus {
  Active = 'active',
  Closed = 'closed',
  Offered = 'offered',
  Deleted = 'deleted',
}

interface Application {
  id: number;
  advertId: number;
  applicantId: number;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  round1: boolean;
  round2: boolean;
  round3: boolean;
  advert?: Advert;
  applicant?: AdvertApplicant;
  chatroomId?: number;
}

interface ApplicationState {
  applicationsRound1: Application[];
  applicationsSelectedRound1: Partial<Application>[];
  applicationsNotSelectedRound1: Partial<Application>[];
  selectedAllRound1: boolean;
  applicationsRound2: Application[];
  applicationsSelectedRound2: Partial<Application>[];
  applicationsNotSelectedRound2: Partial<Application>[];
}

export type {Application, ApplicationState, Applications};
export {ApplicationStatus};
