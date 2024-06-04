import {Advert} from 'reduxFeatures/adverts/types';
import type {SearchScreenNavigationProp} from '../../../../../navigationStacks/types';

type FlatListComponentProps = {
  adverts: Advert[];
  isLessor: boolean;
};

type FlatListSubScreenProps = {
  navigation: SearchScreenNavigationProp;
};

export type {FlatListComponentProps, FlatListSubScreenProps};
