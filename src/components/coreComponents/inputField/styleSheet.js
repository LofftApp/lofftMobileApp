import {StyleSheet} from 'react-native';
import colors from '../../../styles/lofftColorPallet.json';

export const styles = StyleSheet.create({
  inputFieldStyle: {
    marginBottom: 8,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.Black[80],
    paddingHorizontal: 8,
    height: 48,
    justifyContent: 'center',
  },
  focus: {
    borderColor: colors.Lavendar[100],
  },
  errorMessage: {
    margin: 5,
    color: colors.Tomato[100],
  },
  errorActive: {
    borderColor: colors.Tomato[100],
  },
});
