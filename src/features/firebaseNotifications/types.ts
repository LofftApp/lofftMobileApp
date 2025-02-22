import {Application} from 'reduxFeatures/applications/types';
import {UserType} from 'reduxFeatures/user/types';

interface Notification {
  id: number;
  read: boolean;
  createdAt: string;
  title: string;
  body: string;
  advert: {
    id: number;
    status: 'open' | 'review' | 'viewing' | 'offered' | 'closed';
    chatroomId?: number;
    createdAt: string;
    flat: {
      uri: string;
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
  userType: UserType.LESSOR;
}

type TenantNotificationType =
  | 'round_1'
  | 'round_2'
  | 'round_3'
  | 'offered'
  | 'closed';

interface TenantNotification extends Notification {
  notificationType: TenantNotificationType;
  userType: UserType.TENANT;
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
