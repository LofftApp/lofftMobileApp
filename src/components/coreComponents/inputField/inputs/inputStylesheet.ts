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

  inputContainerWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paddingLeft: {
    paddingLeft: size(10),
  },
  paddingRight: {
    paddingRight: size(10),
  },

  searchIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    gap: size(5),
  },
  clearContainer: {
    position: 'absolute',
    top: size(8),
    right: size(10),
    padding: size(5),
    backgroundColor: Color.White[100],
  },
});
