import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Styles
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Components
import {CoreButton} from 'components/buttons/CoreButton';
import {ConfirmBackground, HiFive} from 'assets';
import BackButton from 'components/buttons/BackButton';

//Helpers
import {size} from 'react-native-responsive-sizes';

// Types 🏷️
import {LessorNavigatorScreenNavigationProp} from '../../../../navigationStacks/types';
import {SelectionConfirmedScreenProp} from './types';

const SelectionConfirmedScreen = ({route}: SelectionConfirmedScreenProp) => {
  const {advertId} = route.params;
  const navigation = useNavigation<LessorNavigatorScreenNavigationProp>();

  const handleNavigate = () => {
    navigation.navigate('ApplicationShowScreen', {id: advertId});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ConfirmBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <BackButton style={styles.backButton} onPress={handleNavigate} />
      <HiFive />
      <View style={CoreStyleSheet.screenContainer}>
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

const styles = StyleSheet.create({
  mainContainer: StyleSheet.flatten([
    CoreStyleSheet.safeAreaViewShowContainer,
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

export default SelectionConfirmedScreen;
