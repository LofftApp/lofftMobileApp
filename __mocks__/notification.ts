import {ApplicationStatus} from 'reduxFeatures/applications/types';
import {
  LessorNotification,
  TenantNotification,
} from 'reduxFeatures/firebaseNotifications/types';
import {UserType} from 'reduxFeatures/user/types';

export const lessorNotificationMock: LessorNotification = {
  id: 1,
  read: false,
  userType: UserType.LESSOR,
  notificationType: 'new_applicant',
  createdAt: '2023-12-01T00:00:00.000Z',
  title: 'New Applicant',
  body: 'A new applicant has applied for your flat.',
  advert: {
    id: 42,
    status: 'open',
    createdAt: '2023-12-01T00:00:00.000Z',
    flat: {id: 1, tagLine: 'Beautiful Apartment', uri: 'https://example.com'},
  },
};

export const tenantNotificationMock: TenantNotification = {
  id: 2,
  read: false,
  userType: UserType.TENANT,
  notificationType: 'round_1',
  createdAt: '2023-12-01T00:00:00.000Z',
  title: 'New Applicant',
  body: 'A new applicant has applied for your flat.',
  advert: {
    id: 42,
    status: 'open',
    createdAt: '2023-12-01T00:00:00.000Z',
    flat: {id: 1, tagLine: 'Beautiful Apartment', uri: ''},
  },
  application: {
    id: 1,
    status: ApplicationStatus.Active,
    advertId: 42,
    applicantId: 2,
    createdAt: '2023-12-01T00:00:00.000Z',
    updatedAt: '2023-12-01T00:00:00.000Z',
    round1: false,
    round2: false,
    round3: false,
  },
};
