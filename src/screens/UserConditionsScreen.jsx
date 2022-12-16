import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// API - Firebase 🔥
import auth from '@react-native-firebase/auth';
import {createUserProfile} from '../api/firebase/firestoreActions';

// Screens
import ScreenBackButton from '../components/coreComponents/Screens/ScreenBackButton';

// Styles
import {fontStyles} from '../styles/fontStyles';
import color from '../styles/lofftColorPallet.json';

// Components
import HeadlineContainer from '../components/containers/HeadlineContainer';
import {CoreButton} from '../components/buttons/CoreButton';

const UserConditionsScreen = ({navigation, route}) => {
  return (
    <ScreenBackButton>
      <HeadlineContainer
        headlineText={`Lofft is an ${'\n'}inclusive space`}
        subDescription={''}
      />
      <View style={{flex: 1}}>
        <Text
          style={[
            fontStyles.bodyLarge,
            {color: color.Black[50], marginBottom: 40},
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
        <CoreButton
          value="Continue"
          style={{backgroundColor: color.Lavendar[100], borderWidth: 0}}
          textStyle={[fontStyles.headerSmall, {color: 'white'}]}
          disabled={false}
          onPress={() => {
            createUserProfile({
              personalPreferences: route.params.personalPreferences,
              gender: route.params.gender,
              districts: route.params.districts,
              minRent: route.params.minRent,
              maxRent: route.params.maxRent,
              flatPreferences: route.params.flatPreferences,
              warmRent: route.params.rentWarm,
              textAboutUser: route.params.textAboutUser,
            });
            navigation.navigate('FlatListScreen');
          }}
        />

        <CoreButton
          value="Decline"
          style={{backgroundColor: 'white', borderWidth: 2, marginTop: 10}}
          textStyle={[fontStyles.headerSmall, {color: color.Lavendar[100]}]}
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

export default UserConditionsScreen;
