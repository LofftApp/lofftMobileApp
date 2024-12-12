import {
  LessorNotification,
  TenantNotification,
} from 'reduxFeatures/firebaseNotifications/types';

export const lessorNotificationMock: LessorNotification = {
  id: 1,
  read: false,
  userType: 'lessor',
  notificationType: 'new_applicant',
  createdAt: '2023-12-01T00:00:00.000Z',
  title: 'New Applicant',
  body: 'A new applicant has applied for your flat.',
  advert: {
    id: 42,
    status: 'open',
    createdAt: '2023-12-01T00:00:00.000Z',
    flat: {id: 1, tagLine: 'Beautiful Apartment', url: 'https://example.com'},
  },
};

export const tenantNotificationMock: TenantNotification = {
  id: 2,
  read: false,
  userType: 'tenant',
  notificationType: 'round_1',
  createdAt: '2023-12-01T00:00:00.000Z',
  title: 'New Applicant',
  body: 'A new applicant has applied for your flat.',
  advert: {
    id: 42,
    status: 'open',
    createdAt: '2023-12-01T00:00:00.000Z',
    flat: {id: 1, tagLine: 'Beautiful Apartment', url: ''},
  },
  application: {
    id: 1,
    status: 'active',
    advertId: 42,
    applicantId: 2,
    createdAt: '2023-12-01T00:00:00.000Z',
    updatedAt: '2023-12-01T00:00:00.000Z',
    round1: false,
    round2: false,
    round3: false,
  },
};
