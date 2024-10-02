import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';

// Styles
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Components
import {CoreButton} from 'components/buttons/CoreButton';
import {ApplyForFlatScreenBackground, HiFive} from 'assets';
import BackButton from 'components/buttons/BackButton';

//Helpers
import {size} from 'react-native-responsive-sizes';

// Types 🏷️
import {
  ApplicationScreenNavigationProp,
  SearchScreenNavigationProp,
} from '../../../../navigationStacks/types';

const ApplyForFlatScreen = () => {
  const navigation = useNavigation<
    ApplicationScreenNavigationProp & SearchScreenNavigationProp
  >();
  const credits = useAppSelector(state => state.user.user.credits);
  const canGoBack = navigation.canGoBack();
  console.log('canGoBack', canGoBack);
  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <ApplyForFlatScreenBackground style={styles.backgroundImage} />
      <BackButton style={styles.backButton} onPress={navigation.goBack} />
      <HiFive />
      <View style={CoreStyleSheet.screenContainer}>
        <Text style={[fontStyles.headerSmall, styles.textContainer]}>
          You’ve applied for this Lofft. {'\n'} The owner has maximum 48 hours
          to get back to you!
        </Text>
        <Text style={[fontStyles.bodyMedium, styles.textContainer]}>
          ⚡️ Remaining tokens : {credits}
        </Text>
        <View style={styles.buttonsWrap}>
          <CoreButton
            value={'See all applications'}
            onPress={() =>
              navigation.navigate('applications', {screen: 'applicationsList'})
            }
          />
          <CoreButton
            invert={true}
            value={'Back to search'}
            onPress={() => navigation.navigate('flatOverview')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
  },
  backgroundImage: {
    position: 'absolute',
    top: 50,
    zIndex: -1,
    left: -20,
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

export default ApplyForFlatScreen;
