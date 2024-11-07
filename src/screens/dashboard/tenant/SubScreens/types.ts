import {Advert} from 'reduxFeatures/adverts/types';
import {Application} from 'reduxFeatures/applications/types';

type ListFlatApplicationComponentProps = {
  applications?: Application[];
  adverts?: Advert[];
  isLoading: boolean;
  isError: boolean;
};

type FlatListSubScreenProps = {
  adverts: Advert[];
  isError: boolean;
  isLoading: boolean;
  toggleModal: () => void;
};

export type {ListFlatApplicationComponentProps, FlatListSubScreenProps};
