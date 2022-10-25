import {StyleSheet} from 'react-native';
import * as color from './lofftColorPallet.json';

export const CoreStyleSheet = StyleSheet.create({
  viewContainerStyle: {
    backgroundColor: color.White[100],
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 5,
  },
  viewContainerIOSStyle: {
    paddingTop: 35,
  },
});
