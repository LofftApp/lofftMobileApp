import {Advert, FilterParams} from 'reduxFeatures/adverts/types';
import type {SearchScreenNavigationProp} from '../../../../../navigationStacks/types';

type FlatListComponentProps = {
  adverts: Advert[];
  isLessor: boolean;
};

interface AdvertFlatListSubSceenProps {
  filters: FilterParams;
  search: string;
}

type FlatListSubScreenProps = {
  navigation: SearchScreenNavigationProp;
};

export type {
  FlatListComponentProps,
  FlatListSubScreenProps,
  AdvertFlatListSubSceenProps,
};
