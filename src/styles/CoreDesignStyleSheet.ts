import { StyleSheet } from 'react-native';
import { size } from 'react-native-responsive-sizes';
import Color from './lofftColorPallet.json';
import { useSelector } from 'react-redux';
import { RootState } from 'reduxCore/store';

export const CoreStyleSheet = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;

  return StyleSheet.create({
    viewContainerStyle: {
      backgroundColor: colors.White[100],
      flex: 1,
      paddingHorizontal: size(15),
      paddingTop: size(5),
    },
    viewContainerIOSStyle: {
      paddingTop: 35,
    },
    modalContainer: {
      height: '75%',
      marginTop: 'auto',
      backgroundColor: colors.White[100],
      borderRadius: 10,
      alignItems: 'center',
    },
    fullScreenModalContainer: {
      height: '100%',
      backgroundColor: colors.White[100],
      flex: 1,
      alignItems: 'center',
    },
    safeAreaViewListContainer: {
      backgroundColor: colors.White[100],
      flex: 1,
    },
    safeAreaViewShowContainer: {
      backgroundColor: colors.White[100],
      height: '100%',
    },
    showContainer: {
      flex: 1,
      backgroundColor: colors.White[100],
    },
    screenContainer: {
      flex: 1,
      height: '100%',
      width: '100%',
      paddingHorizontal: size(16),
      paddingVertical: size(20),
    },
    headerContainer: {
      paddingHorizontal: size(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: size(10),
      marginBottom: size(10),
    },
    backgroundContainer: {
      position: 'absolute',
      backgroundColor: colors.Lavendar[100],
      zIndex: -1,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      zIndex: -1,
      left: 0,
    },
  });
};
