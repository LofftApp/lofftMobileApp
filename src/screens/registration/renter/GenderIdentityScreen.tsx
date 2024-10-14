import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';

// Screens 📺
import {newUserScreens} from '../../../components/componentData/newUserScreens';
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
interface SelectButton {
  id: number;
  value: string;
  toggle: boolean;
  emoji: string;
}

const gendersRenter = [
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

const gendersLessor = [
  {value: 'Male', id: 1, toggle: false, emoji: '👨'},
  {value: 'Female', id: 2, toggle: false, emoji: '👩'},
  {value: 'Non-Binary', id: 3, toggle: false, emoji: '💁'},
  {
    value: 'Another gender identity not listed',
    id: 4,
    toggle: false,
    emoji: '🙆',
  },
  {value: 'Women only', id: 5, toggle: false, emoji: '🙋‍♀️'},
  {value: 'Queer space', id: 6, toggle: false, emoji: '⚧️'},
  {value: 'Trans & non-binary safe space', id: 7, toggle: false, emoji: '🏳️‍⚧️'},
  {value: 'Prefer not to say', id: 8, toggle: false, emoji: '🤐'},
];

const GenderIdentityScreen = () => {
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor, newUserDetails, setNewUserDetails} = useNewUserDetails();
  const genders = isLessor ? gendersLessor : gendersRenter;
  const [intitalGenders, setIntitalGenders] = useState(genders);
  const [selectedGender, setSelectedGender] = useState<SelectButton[]>([]);
  const savedGender = newUserDetails.genderIdentity;
  console.log('newUserDetails', newUserDetails);

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
  }, [savedGender, genders]);
  const selectGender = (id: number) => {
    const updatedGender = intitalGenders.map(el => {
      if (el.id === id) {
        return {
          ...el,
          toggle: !el.toggle,
        };
      } else {
        return {
          ...el,
          toggle: false,
        };
      }
    });

    const genderSelected = updatedGender.filter(el => el.toggle);
    setSelectedGender(genderSelected);
    setIntitalGenders(updatedGender);
    setNewUserDetails({genderIdentity: genderSelected});
  };

  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
  };

  const handleContinue = () => {
    const screen = isLessor
      ? newUserScreens.lessor[6]
      : newUserScreens.renter[4];
    navigation.navigate(screen);
    setNewUserDetails({genderIdentity: selectedGender});
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
          subDescription={'To create a safe place for... '}
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
          <NewUserPaginationBar />
          <NewUserJourneyContinueButton
            value="Continue"
            disabled={selectedGender.length === 0}
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

export default GenderIdentityScreen;
