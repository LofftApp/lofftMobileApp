import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';

// Screens 📺
import {newUserScreens} from '../../../navigationStacks/newUserScreens';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

//Styles 🎨
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Assets
import {RegistrationBackground} from 'assets';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import Divider from 'components/bars/Divider';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

//Validation 🛡  ️
import {genderIdentitiesSchema} from 'lib/zodSchema';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

//Constants 📊
import {MAX_GENDERS} from 'components/componentData/constants';

//Types 🏷  ️
import {
  NewUserJourneyStackNavigation,
  SettingsScreenNavigationProp,
} from '../../../navigationStacks/types';
import {Gender} from 'reduxFeatures/assets/types';
import {useUserType} from 'reduxFeatures/user/useUserType';

const genders: Gender[] = [
  {name: 'Male', id: 1, toggle: false, emoji: '👨'},
  {name: 'Female', id: 2, toggle: false, emoji: '👩'},
  {name: 'Non-Binary', id: 3, toggle: false, emoji: '💁'},
  {
    name: 'Another gender identity not listed',
    id: 4,
    toggle: false,
    emoji: '🙆',
  },

  {name: 'Prefer not to say', id: 5, toggle: false, emoji: '🤐'},
];

const GenderIdentityScreen = ({route}: {route?: {params: {edit: boolean}}}) => {
  const edit = route?.params?.edit;
  // Navigation
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {isNewUserLessor, newUserDetails, setNewUserDetails} =
    useNewUserDetails(isLessor, edit);

  const savedGenders = newUserDetails.genderIdentity;

  // Local State
  const [selectedGenderIds, setSelectedGenderIds] = useState<number[]>([]);
  const [error, setError] = useState<string | undefined>('');
  useEffect(() => {
    if (savedGenders.length > 0) {
      const savedGenderIds = genders
        .filter(g => savedGenders.includes(g.name))
        .map(g => g.id);

      setSelectedGenderIds(savedGenderIds);
    }
  }, [savedGenders]);

  const selectGender = (id: number) => {
    setSelectedGenderIds(prevIds => (prevIds.includes(id) ? [] : [id]));
  };

  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
    setError('');
  };

  const handleContinue = () => {
    const selectedGenders = genders?.filter(g =>
      selectedGenderIds.includes(g.id),
    );
    const result = genderIdentitiesSchema.safeParse(selectedGenders);
    if (!result.success) {
      setError(result.error?.flatten().formErrors.at(0));
      return;
    }
    const selectedGenderNames = selectedGenders.map(g => g.name);
    setNewUserDetails({genderIdentity: selectedGenderNames});

    if (edit) {
      if (isLessor) {
        navigation.goBack();
      } else {
        navigation.navigate('NewUserNavigator', {
          screen: 'SafeSpaceForScreen',
          params: {edit: true},
        });
      }
    } else {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);

      setCurrentScreen(currentScreen + 1);
    }
    setError('');
  };

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={CoreStyleSheet.screenContainer}>
        <HeadlineContainer
          headlineText={'What is your gender identity?'}
          subDescription={'To help you find the right match'}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.selectionContainer}>
            {genders.map(el => (
              <SelectionButton
                key={el.id}
                value={el.name}
                toggle={selectedGenderIds.includes(el.id)}
                id={el.id}
                emojiIcon={el.emoji}
                selectFn={selectGender}
              />
            ))}
          </View>
        </ScrollView>
        <Divider />

        <View style={styles.footerContainer}>
          {error && <ErrorMessage message={error} />}
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={edit ? (isLessor ? 'Save' : 'Continue') : 'Continue'}
            disabled={
              selectedGenderIds.length === 0 ||
              selectedGenderIds.length > MAX_GENDERS
            }
            onPress={handleContinue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    marginTop: size(10),
    paddingHorizontal: size(10),
  },
  tagInfoContainer: {
    marginBottom: size(5),
  },
  footerContainer: {
    paddingTop: size(20),
  },
});

export default GenderIdentityScreen;
