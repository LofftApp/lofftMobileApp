
import {StyleSheet} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import { useSelector } from 'react-redux';
import { RootState } from 'reduxCore/store';
import Color from 'styleSheets/lofftColorPallet.json';

export const InputStyleSheet = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;

  return StyleSheet.create({
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
      marginLeft: size(5),
      marginRight: size(10),
      gap: size(8),
    },
    clearContainer: {
      position: 'absolute',
      right: 0,
      padding: size(5),
      backgroundColor: colors.White[100],
    },
    input: {
      paddingLeft: size(10),
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
};
