import {StyleProp, ViewStyle} from 'react-native';

type InputFieldTextProps = {
  placeholder?: string | null;
  type?: string | null;
  onChangeText: (text: string) => void;
  value: string;
  onClear?: () => void;
  errorMessage?: string | null;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  dropdown?: boolean;
  dropDownContent?: string[];
  dropDownPressAction?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

export type {InputFieldTextProps};
