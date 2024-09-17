import type {SearchScreenNavigationProp} from '../../../../../navigationStacks/types';
import {Application} from 'reduxFeatures/applications/types';

type ListFlatApplicationComponentProps = {
  applications: Application[];
  isLessor: boolean;
};

type FlatListSubScreenProps = {
  navigation: SearchScreenNavigationProp;
};

export type {ListFlatApplicationComponentProps, FlatListSubScreenProps};
