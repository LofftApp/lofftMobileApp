import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
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

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

//Types 🏷  ️
import {NewUserJourneyStackNavigation} from '../../../navigationStacks/types';
import {genderIdentitySchema} from 'lib/zodSchema';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import {MAX_GENDERS} from 'components/componentData/constants';
import {fontStyles} from 'styleSheets/fontStyles';
interface SelectButton {
  id: number;
  value: string;
  toggle: boolean;
  emoji: string;
}

const genders = [
  {value: 'Women only', id: 1, toggle: false, emoji: '🙋‍♀️'},
  {value: 'Men only', id: 2, toggle: false, emoji: '🙋‍♂️'},
  {value: 'Queer space', id: 3, toggle: false, emoji: '⚧️'},
  {value: 'Trans & non-binary safe space', id: 4, toggle: false, emoji: '🏳️‍⚧️'},
  {value: 'LGBTQ+ friendly', id: 5, toggle: false, emoji: '🏳️‍🌈'},
  {value: 'Gender-neutral space', id: 6, toggle: false, emoji: '⚧️'},
  {value: 'All genders welcome', id: 7, toggle: false, emoji: '🌍'},
  {value: 'Non-binary inclusive', id: 8, toggle: false, emoji: '💛🤍💜🖤'},
  {value: 'Prefer not to say', id: 9, toggle: false, emoji: '🤐'},
];

const SafePlaceForScreen = () => {
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor, newUserDetails, setNewUserDetails} = useNewUserDetails();

  const [intitalGenders, setIntitalGenders] = useState(genders);
  const [selectedGender, setSelectedGender] = useState<SelectButton[]>([]);
  const [error, setError] = useState<string | undefined>('');
  const flatIdentity = newUserDetails.flatIdentities;

  useEffect(() => {
    if (flatIdentity && flatIdentity.length > 0) {
      setSelectedGender(flatIdentity);

      const updatedGenderState = genders.map(gender => ({
        ...gender,
        toggle: flatIdentity.some(g => g.id === gender.id),
      }));

      setIntitalGenders(updatedGenderState);
    } else {
      setSelectedGender([]);
    }
  }, [flatIdentity]);

  const selectGender = (id: number) => {
    const updatedGender = intitalGenders.map(el => {
      return el.id === id ? {...el, toggle: !el.toggle} : el;
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

    setNewUserDetails({flatIdentities: selectedGender});

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
          headlineText={
            isLessor
              ? 'Your flat is a safe place for...'
              : 'What is a safe place for you?'
          }
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
          <View style={styles.tagInfoContainer}>
            <Text
              style={
                fontStyles.bodySmall
              }>{`* Select up to ${MAX_GENDERS} tags`}</Text>
          </View>

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
    paddingBottom: size(10),
  },
});

export default SafePlaceForScreen;