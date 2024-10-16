import {StyleSheet} from 'react-native';
import {size} from 'react-native-responsive-sizes';

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: size(5),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: size(5),
    gap: size(8),
  },

  dropDownContainer: {
    borderWidth: 2,
    padding: 0,
    margin: 0,
  },
});
