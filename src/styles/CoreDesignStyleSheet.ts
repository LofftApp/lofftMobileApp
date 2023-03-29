import {StyleSheet} from 'react-native';
import * as color from './lofftColorPallet.json';

export const CoreStyleSheet = StyleSheet.create({
  viewContainerStyle: {
    backgroundColor: color.White[100],
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 5,
    height: '100%',
  },
  viewContainerIOSStyle: {
    paddingTop: 35,
  },
});
