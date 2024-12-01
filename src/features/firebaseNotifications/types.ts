import {Advert} from 'reduxFeatures/adverts/types';

interface LessorNotification {
  id: number;
  read: boolean;
  createdAt: string;
  data: string;
  advert: Partial<Advert>;
}

export type {LessorNotification};
