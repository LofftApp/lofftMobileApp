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

export type {
  HeaderPageContentSwitchProps,
  CoreButtonProps,
  ChipsProps,
  FilterButtonProps,
  MatchingScoreButtonProps,
  BackButtonProps,
};
