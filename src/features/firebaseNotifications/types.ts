import {Application} from 'reduxFeatures/applications/types';

interface Notification {
  id: number;
  read: boolean;
  createdAt: string;
  title: string;
  body: string;
  advert: {
    id: number;
    status: 'open' | 'review' | 'viewing' | 'offered' | 'closed';
    createdAt: string;
    flat: {
      url: string;
      id: number;
      tagLine: string;
    };
  };
}

type LessorNotificationType =
  | 'open'
  | 'review'
  | 'viewing'
  | 'offered'
  | 'closed'
  | 'new_applicant';

interface LessorNotification extends Notification {
  notificationType: LessorNotificationType;
  userType: 'lessor';
}

type TenantNotificationType =
  | 'round_1'
  | 'round_2'
  | 'round_3'
  | 'offered'
  | 'closed';

interface TenantNotification extends Notification {
  notificationType: TenantNotificationType;
  userType: 'tenant';
  application: Application;
}

interface Notifications {
  notifications: LessorNotification[] | TenantNotification[];
}

export type {
  Notification,
  LessorNotification,
  TenantNotification,
  Notifications,
  LessorNotificationType,
  TenantNotificationType,
};
