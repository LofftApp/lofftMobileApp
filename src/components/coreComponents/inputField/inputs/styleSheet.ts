import {StyleSheet} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import Color from 'styleSheets/lofftColorPallet.json';
export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: size(10),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: size(5),
    marginRight: size(10),
    gap: size(8),
  },
  clearContainer: {
    position: 'absolute',
    right: 0,
    padding: size(5),
    backgroundColor: Color.White[100],
  },
  input: {
    flex: 1,
  },
  clearButton: {
    padding: size(0),
  },

  dropDownContainer: {
    borderWidth: 2,
    padding: 0,
    margin: 0,
  },

  inputFieldTextStyle: {
    margin: 0,
    marginLeft: size(10),
    paddingVertical: size(0),
    flex: 1,
  },
});
