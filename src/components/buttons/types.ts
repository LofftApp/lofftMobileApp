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
  onPress?: (event: GestureResponderEvent) => void | undefined;
  disabled?: boolean;
};

export type {HeaderPageContentSwitchProps, CoreButtonProps};
