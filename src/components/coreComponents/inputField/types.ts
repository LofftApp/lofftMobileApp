import {StyleProp, ViewStyle} from 'react-native';

type InputFieldTextProps = {
  placeholder?: string | null;
  type?: string | null;
  onChangeText: (text: string | number | any) => void;
  value: string;
  onClear?: () => void;
  errorMessage?: string | null;
  keyboardType?: string;
  dropdown?: boolean;
  dropDownContent?: string[];
  dropDownPressAction?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

export type {InputFieldTextProps};
