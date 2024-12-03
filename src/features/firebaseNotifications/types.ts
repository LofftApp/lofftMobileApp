import {Advert} from 'reduxFeatures/adverts/types';
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
  application: Application;
}

interface Notifications {
  notifications: Notification[];
}

export type {Notification, Notifications};
