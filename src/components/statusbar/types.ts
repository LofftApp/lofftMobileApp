import {Advert} from 'reduxFeatures/adverts/types';
import {
  LessorNavigatorScreenNavigationProp,
  SearchScreenNavigationProp,
} from '../../../navigationStacks/types';
import {Application} from 'reduxFeatures/applications/types';

type StatusBarNavigationProp = LessorNavigatorScreenNavigationProp &
  SearchScreenNavigationProp;

type StatusBarProps = {
  _advert?: Advert;
  application?: Application;
  isLessor: boolean;
};
export type {StatusBarNavigationProp, StatusBarProps};
