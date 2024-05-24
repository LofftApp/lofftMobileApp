import {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';

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
  textStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void | undefined;
  disabled?: boolean;
};

export type {HeaderPageContentSwitchProps, CoreButtonProps};
