import type {
  AdvertCharacteristics,
  AdvertFeatures,
} from 'reduxFeatures/adverts/types';
import type {UserCharacteristics} from 'reduxFeatures/user/types';

type DateFormatConverterArgs = {
  date: Date | {seconds: number} | string;
  format?: string;
};

type Tag = AdvertCharacteristics | AdvertFeatures | UserCharacteristics | null;
type SortedTag = {negativeTags: Tag[]; positiveTags: Tag[]};

export type {DateFormatConverterArgs, Tag, SortedTag};
