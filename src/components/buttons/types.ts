import {Tag} from 'helpers/types';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

type HeaderPageContentSwitchProps = {
  toggleNames: string[];
  toggleIcons: string[];
  activeScreen: string;
  setActiveScreen: (activeScreen: string) => void;
  markers: string[];
};

type CoreButtonProps = {
  value: string;
  invert?: boolean;
  icon?: JSX.Element;
  textSize?: TextStyle;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle | TextStyle[] | null;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

type ChipsProps = {
  tags: Tag[];
  emoji?: boolean;
  features?: boolean;
  expand?: boolean;
  xs?: boolean;
  whiteBg?: boolean;
  open?: boolean;
};

type FilterButtonProps = {
  onPress: () => void;
};

type MatchingScoreButtonProps = {
  size: string;
  score: number;
};

type BackButtonProps = {
  onPress: () => void;
  title?: string;
  close?: boolean;
  style?: StyleProp<ViewStyle>;
  neutral?: boolean;
  absolute?: boolean;
};

type SeeMoreButtonProps = {
  collapsed: boolean;
  toggleExpand: () => void;
  noText?: boolean;
  iconSize?: number;
};

type SelectionButtonProps = {
  id: number;
  emojiIcon?: string;
  value: string;
  toggle: boolean;
  selectFn: (id: number) => void;
  disabled?: boolean;
};

type NewUserJourneyButtonProps = {
  text: string;
  icon: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  type: 'lessor' | 'renter';
  isActive: boolean;
};

type IconButtonProps = {
  text: string;
  icon: string;
  iconSize?: number;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  animation?: boolean;
  isActive?: boolean;
};
type NewUserJourneyContinueButtonProps = {
  onPress: () => void;
  value: string;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export type {
  HeaderPageContentSwitchProps,
  CoreButtonProps,
  ChipsProps,
  FilterButtonProps,
  MatchingScoreButtonProps,
  BackButtonProps,
  SeeMoreButtonProps,
  SelectionButtonProps,
  NewUserJourneyButtonProps,
  IconButtonProps,
  NewUserJourneyContinueButtonProps,
};
