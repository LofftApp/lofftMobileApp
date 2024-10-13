import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux 🏗️
import {useAppDispatch} from 'reduxCore/hooks';
import {saveUserDetails} from 'reduxFeatures/registration/newUserSlice';
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import {CoreButton} from 'components/buttons/CoreButton';
import UserJourneySaveButton from 'components/buttons/UserJourneySaveButton';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

// Types
import {NewUserJourneyStackNavigation} from '../../navigationStacks/types';

const ConditionsOfUseScreen = () => {
  const dispatch = useAppDispatch();
  const [signOut] = useSignOutMutation();
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
  const handleSignOut = () => {
    signOut();
  };
  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText={`Lofft is an ${'\n'}inclusive space`}
        subDescription={''}
      />
      <View style={styles.flexWrapper}>
        <Text style={[fontStyles.bodyLarge, styles.descriptionText]}>
          Lofft is an inclusive place for everyone to be. We exist to include
          and not divide.
        </Text>
        <Text>
          Therefore, we ask our members to agree to the statement below:
          {'\n'}
          {'\n'}
          “I agree to treat others in the Lofft community with respect. I agree
          to not discriminate, have judgment or bias of others based on their
          sex, race, religion, disability, language, gender identity, sexual
          orentation, national origin, age, ethnicity, political or any other
          opinion.
        </Text>
      </View>

      <View style={styles.options}>
        <UserJourneySaveButton
          value="Continue"
          onPress={() => {
            dispatch(saveUserDetails);
            navigation.navigate('dashboard');
          }}
        />

        <CoreButton
          value="Decline"
          style={styles.buttonStyle}
          textStyle={[fontStyles.headerSmall, {color: Color.Lavendar[100]}]}
          disabled={false}
          onPress={handleSignOut}
        />
      </View>
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  flexWrapper: {
    flex: 1,
  },
  descriptionText: {
    color: Color.Black[50],
    marginBottom: size(40),
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderWidth: size(2),
    marginTop: size(10),
  },
  options: {
    marginBottom: size(55),
  },
});

export default ConditionsOfUseScreen;
