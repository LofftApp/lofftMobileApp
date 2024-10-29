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
import SelectButton from 'components/buttons/SelectButton';
import SelectionButton from 'components/buttons/SelectionButton';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import Divider from 'components/bars/Divider';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

//Validation 🛡  ️
import {genderIdentitySchema} from 'lib/zodSchema';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

//Constants 📊
import {MAX_GENDERS} from 'components/componentData/constants';

//Types 🏷  ️
import {NewUserJourneyStackNavigation} from '../../../navigationStacks/types';
interface SelectButton {
  id: number;
  value: string;
  toggle: boolean;
  emoji: string;
}

const genders = [
  {value: 'Male', id: 1, toggle: false, emoji: '👨'},
  {value: 'Female', id: 2, toggle: false, emoji: '👩'},
  {value: 'Non-Binary', id: 3, toggle: false, emoji: '💁'},
  {
    value: 'Another gender identity not listed',
    id: 4,
    toggle: false,
    emoji: '🙆',
  },

  {value: 'Prefer not to say', id: 5, toggle: false, emoji: '🤐'},
];

const GenderIdentityScreen = () => {
  // Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor, newUserDetails, setNewUserDetails} = useNewUserDetails();

  const savedGender = newUserDetails.genderIdentity;

  // Local State
  const [intitalGenders, setIntitalGenders] = useState(genders);
  const [selectedGender, setSelectedGender] = useState<SelectButton[]>([]);
  const [error, setError] = useState<string | undefined>('');

  useEffect(() => {
    if (savedGender && savedGender.length > 0) {
      setSelectedGender(savedGender);

      const updatedGenderState = genders.map(gender => ({
        ...gender,
        toggle: savedGender.some(g => g.id === gender.id),
      }));

      setIntitalGenders(updatedGenderState);
    } else {
      setSelectedGender([]);
    }
  }, [savedGender]);

  const selectGender = (id: number) => {
    const updatedGender = intitalGenders.map(el => {
      return el.id === id
        ? {...el, toggle: !el.toggle}
        : {...el, toggle: false};
    });

    const genderSelected = updatedGender.filter(el => el.toggle);
    setSelectedGender(genderSelected);
    setIntitalGenders(updatedGender);
  };

  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
    setError('');
  };

  const handleContinue = () => {
    const result = genderIdentitySchema.safeParse(selectedGender);
    if (!result.success) {
      setError(result.error?.flatten().formErrors.at(0));
      return;
    }

    setNewUserDetails({genderIdentity: selectedGender});

    const screen = isLessor
      ? newUserScreens.lessor[currentScreen + 1]
      : newUserScreens.tenant[currentScreen + 1];
    navigation.navigate(screen);

    setCurrentScreen(currentScreen + 1);
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
            {intitalGenders.map((el, index) => (
              <SelectionButton
                key={index + 1}
                value={el.value}
                toggle={el.toggle}
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
          <NewUserPaginationBar />
          <NewUserJourneyContinueButton
            value="Continue"
            disabled={
              selectedGender.length === 0 || selectedGender.length > MAX_GENDERS
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
