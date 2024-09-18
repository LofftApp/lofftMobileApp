import {Advert} from 'reduxFeatures/adverts/types';
import type {SearchScreenNavigationProp} from '../../../../../navigationStacks/types';
import {Application} from 'reduxFeatures/applications/types';

type ListFlatApplicationComponentProps = {
  applications?: Application[];
  adverts?: Advert[];
  isLessor: boolean;
};

type FlatListSubScreenProps = {
  navigation: SearchScreenNavigationProp;
};

export type {ListFlatApplicationComponentProps, FlatListSubScreenProps};
