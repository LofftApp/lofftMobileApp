import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux 🏗️
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Styles
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import Color from 'styleSheets/lofftColorPallet.json';

//Components
import {CoreButton} from 'components/buttons/CoreButton';
import {ConfirmBackground, HiFive} from 'assets';
import BackButton from 'components/buttons/BackButton';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

//Helpers
import {size} from 'react-native-responsive-sizes';

// Types 🏷️
import {
  ApplicationScreenNavigationProp,
  SearchScreenNavigationProp,
} from '../../../navigationStacks/types';

const ApplyForFlatScreen = () => {
  const navigation = useNavigation<
    ApplicationScreenNavigationProp & SearchScreenNavigationProp
  >();
  const {data, isLoading, isError} = useGetUserQuery();
  const credits = data?.credits;

  if (isLoading) {
    <LoadingComponent />;
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ConfirmBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <BackButton style={styles.backButton} onPress={navigation.goBack} />
      <HiFive />
      <View style={CoreStyleSheet.screenContainer}>
        <Text style={[fontStyles.headerSmall, styles.textContainer]}>
          You’ve applied for this Lofft. {'\n'} The owner has maximum 48 hours
          to get back to you!
        </Text>
        {!isError ? (
          <Text style={[fontStyles.bodyMedium, styles.textContainer]}>
            ⚡️ Remaining tokens: {credits}
          </Text>
        ) : (
          <Text
            style={[
              fontStyles.bodyMedium,
              styles.textContainer,
              {color: Color.Tomato[100]},
            ]}>
            Failed to get ramining tokens
          </Text>
        )}
        <View style={styles.buttonsWrap}>
          <CoreButton
            value={'See all applications'}
            onPress={() =>
              navigation.navigate('applications', {
                screen: 'ApplicationsIndexScreen',
              })
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

export default ApplyForFlatScreen;
