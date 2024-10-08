import {Advert} from 'reduxFeatures/adverts/types';
import {Application} from 'reduxFeatures/applications/types';

type ListFlatApplicationComponentProps = {
  applications?: Application[];
  adverts?: Advert[];
  isLessor: boolean;
};

type FlatListSubScreenProps = {
  adverts: Advert[];
  isError: boolean;
  isLoading: boolean;
};

export type {ListFlatApplicationComponentProps, FlatListSubScreenProps};
