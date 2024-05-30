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
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle | TextStyle[] | null;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

type ChipsProps = {
  tags: Tag[];
  emoji?: boolean;
  positive?: boolean;
  features?: boolean;
};

type FilterButtonProps = {
  onPress: () => void;
};

export type {
  HeaderPageContentSwitchProps,
  CoreButtonProps,
  ChipsProps,
  FilterButtonProps,
};
