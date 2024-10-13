import React, {useEffect, useState} from 'react';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectButton from 'components/buttons/SelectButton';

// Helper 🤝
import {navigationHelper} from 'helpers/navigationHelper';
import FooterNavBarWithPagination from 'components/bars/FooterNavBarWithPagination';
import {useNavigation} from '@react-navigation/native';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {NewUserJourneyStackNavigation} from '../../../navigationStacks/types';
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';
import SelectionButton from 'components/buttons/SelectionButton';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import BackButton from 'components/buttons/BackButton';
import {RegistrationBackground} from 'assets';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import {size} from 'react-native-responsive-sizes';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {newUserScreens} from '../../../components/componentData/newUserScreens';
import Divider from 'components/bars/Divider';

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
  {value: 'Women only', id: 5, toggle: false, emoji: '🙋‍♀️'},
  {value: 'Queer space', id: 6, toggle: false, emoji: '⚧️'},
  {value: 'Trans & non-binary safe space', id: 7, toggle: false, emoji: '🏳️‍⚧️'},
  {value: 'Prefer not to say', id: 8, toggle: false, emoji: '🤐'},
];
const GenderIdentityScreen = () => {
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();

  const [intitalGenders, setIntitalGenders] = useState(genders);
  const [selectedGender, setSelectedGender] = useState<SelectButton[]>([]);
  const {isLessor, newUserDetails, setNewUserDetails} = useNewUserDetails();
  const savedGender = newUserDetails.genderIdentity;

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

  const handleNavigation = () => {
    const screen = isLessor
      ? newUserScreens.lessor[3]
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
            onPress={handleNavigation}
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
