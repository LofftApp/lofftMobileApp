import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Redux 🏗️
import {useAppDispatch} from '@ReduxCore/hooks';
import {saveUserDetails} from 'redux/registration/userJourneySlice';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import {CoreButton} from 'components/buttons/CoreButton';
import UserJourneySaveButton from 'redux/registration/UserJourneySaveButton';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

const ConditionsOfUseScreen = ({navigation, route}: any) => {
  const dispatch = useAppDispatch();
  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText={`Lofft is an ${'\n'}inclusive space`}
        subDescription={''}
      />
      <View style={{flex: 1}}>
        <Text
          style={[
            fontStyles.bodyLarge,
            {color: Color.Black[50], marginBottom: 40},
          ]}>
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
          style={{backgroundColor: 'white', borderWidth: 2, marginTop: 10}}
          textStyle={[fontStyles.headerSmall, {color: Color.Lavendar[100]}]}
          disabled={false}
          onPress={() => auth().signOut()}
        />
      </View>
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  options: {
    marginBottom: 55,
  },
});

export default ConditionsOfUseScreen;
