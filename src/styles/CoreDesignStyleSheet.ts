import {StyleSheet} from 'react-native';
import * as Color from 'styleSheets/lofftColorPallet.json';
import * as color from './lofftColorPallet.json';
import {size} from 'react-native-responsive-sizes';

export const CoreStyleSheet = StyleSheet.create({
  viewContainerStyle: {
    backgroundColor: color.White[100],
    flex: 1,
    paddingHorizontal: size(15),
    paddingTop: size(5),
  },
  viewContainerIOSStyle: {
    paddingTop: 35,
  },
  modalContainer: {
    height: '70%',
    marginTop: 'auto',
    backgroundColor: Color.White[100],
    borderRadius: 10,
  },
  safeAreaViewListContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  safeAreaViewShowContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
    alignItems: 'center',
  },

  screenContainer: {
    width: '100%',
    paddingHorizontal: size(16),
    paddingBottom: size(110),
  },
});
