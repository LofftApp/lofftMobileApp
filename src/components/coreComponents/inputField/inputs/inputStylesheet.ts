import {StyleSheet} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import Color from 'styleSheets/lofftColorPallet.json';

export const inputStyles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Color.Black[50],
    paddingHorizontal: size(4),
    height: size(48),
  },

  focus: {
    borderColor: Color.Lavendar[100],
  },
  errorActive: {
    borderColor: Color.Tomato[100],
  },
  defaultInput: {
    paddingLeft: size(10),
  },
});
