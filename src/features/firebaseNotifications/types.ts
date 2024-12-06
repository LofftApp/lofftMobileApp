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

interface LessorNotification extends Notification {
  notificationType: 'open' | 'review' | 'viewing' | 'offered' | 'closed';
  userType: 'lessor';
}

interface TenantNotification extends Notification {
  notificationType: 'round1' | 'round2' | 'round_3' | 'offered' | 'closed';
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
};
