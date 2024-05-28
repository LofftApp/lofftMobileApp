import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  AdvertCharacteristics,
  AdvertFeatures,
} from 'reduxFeatures/adverts/types';

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
  onPress?: (event: GestureResponderEvent) => void | undefined;
  disabled?: boolean;
};

type ChipsProps = {
  tags: AdvertCharacteristics[] | AdvertFeatures[] | null;
  emoji?: boolean;
  positive?: boolean;
  features?: boolean;
};

export type {HeaderPageContentSwitchProps, CoreButtonProps, ChipsProps};
