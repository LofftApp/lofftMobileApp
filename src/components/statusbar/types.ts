import {Advert} from 'reduxFeatures/adverts/types';
import {
  LessorNavigatorScreenNavigationProp,
  SearchScreenNavigationProp,
} from '../../navigationStacks/types';
import {Application} from 'reduxFeatures/applications/types';

type StatusBarNavigationProp = LessorNavigatorScreenNavigationProp &
  SearchScreenNavigationProp;

type StatusBarProps = {
  _advert?: Advert;
  application?: Application;
};
export type {StatusBarNavigationProp, StatusBarProps};
