import type {
  AdvertCharacteristics,
  AdvertFeatures,
} from 'reduxFeatures/adverts/types';
import type {UserCharacteristics} from 'reduxFeatures/user/types';

type DateFormatConverterArgs = {
  date: Date | {seconds: number} | string;
  format?: string;
};
type KeyValueObject = {
  [key: string]: any;
};

type Tag =
  | AdvertCharacteristics
  | AdvertFeatures
  | UserCharacteristics
  | KeyValueObject
  | null;

export type {DateFormatConverterArgs, Tag, KeyValueObject};
