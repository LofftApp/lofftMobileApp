import {StyleSheet} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import Color from 'styleSheets/lofftColorPallet.json';
export const styles = StyleSheet.create({
  inputContainerWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: size(10),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: size(10),
    gap: size(8),
    marginBottom: size(10),
  },
  clearContainer: {
    position: 'absolute',
    right: 0,
    padding: size(5),
    backgroundColor: Color.White[100],
  },
  input: {
    paddingLeft: size(10),
    marginBottom: size(0),
  },
  clearButton: {
    padding: 0,
  },

  dropDownContainer: {
    borderWidth: 2,
    padding: 0,
    margin: 0,
  },
});
