import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Styles
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import { createFontStyles } from 'styleSheets/fontStyles';

// Redux
import { useSelector } from 'react-redux';

// Components
import {CoreButton} from 'components/buttons/CoreButton';
import {ConfirmBackground, HiFive} from 'assets';
import BackButton from 'components/buttons/BackButton';

// Helpers
import {size} from 'react-native-responsive-sizes';

// Types 🏷️
import {LessorNavigatorScreenNavigationProp} from '../../../../navigationStacks/types';
import {SelectionConfirmedScreenProp} from './types';
import { RootState } from 'reduxCore/store';

const SelectionConfirmedScreen = ({route}: SelectionConfirmedScreenProp) => {
  // CoreStyles
  const coreStyles = CoreStyleSheet();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const fontStyles = createFontStyles(isDarkMode);

  const {advertId} = route.params;
  const navigation = useNavigation<LessorNavigatorScreenNavigationProp>();

  const handleNavigate = () => {
    navigation.navigate('ApplicationShowScreen', {id: advertId});
  };

  const styles = StyleSheet.create({
    mainContainer: StyleSheet.flatten([
      coreStyles.safeAreaViewShowContainer,
      {alignItems: 'center', flex: 1},
    ]),
    backButton: {
      marginLeft: 10,
    },
    textContainer: {
      textAlign: 'center',
      marginTop: size(24),
    },
    buttonsWrap: {
      width: '100%',
      gap: size(10),
      marginTop: size(24),
    },
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ConfirmBackground
        height="100%"
        width="100%"
        style={coreStyles.backgroundImage}
      />
      <BackButton style={styles.backButton} onPress={handleNavigate} />
      <HiFive />
      <View style={coreStyles.screenContainer}>
        <Text style={[fontStyles.headerSmall, styles.textContainer]}>
          Selection Confirmed!
        </Text>
        <Text style={[fontStyles.bodyMedium, styles.textContainer]}>
          We'll notify the selected applicants, as well as those who didn't make
          it.
        </Text>

        <View style={styles.buttonsWrap}>
          <CoreButton
            invert={true}
            value={'Back to my listing'}
            onPress={handleNavigate}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectionConfirmedScreen;
