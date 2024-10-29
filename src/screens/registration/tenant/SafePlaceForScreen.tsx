import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';

// Screens 📺
import {newUserScreens} from '../../../navigationStacks/newUserScreens';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';

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

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

//Types 🏷  ️
import {NewUserJourneyStackNavigation} from '../../../navigationStacks/types';
import {genderIdentitySchema} from 'lib/zodSchema';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import {MAX_GENDERS} from 'components/componentData/constants';
import {fontStyles} from 'styleSheets/fontStyles';

const SafePlaceForScreen = () => {
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  // initial state
  const {data} = useGetAssetsQuery();
  const safeSpaces = data?.safeSpaces;

  // Local State
  const [selectedSafeSpaceIds, setSelectedSafeSpaceIds] = useState<number[]>(
    [],
  );
  const [error, setError] = useState<string | undefined>('');

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor, newUserDetails, setNewUserDetails} = useNewUserDetails();
  const savedSafeSpacesIds = newUserDetails.safeSpaces;

  useEffect(() => {
    if (savedSafeSpacesIds.length) {
      setSelectedSafeSpaceIds(savedSafeSpacesIds);
    }
  }, [savedSafeSpacesIds]);

  const selectSafeSpace = (id: number) => {
    setSelectedSafeSpaceIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(safeSpId => safeSpId !== id)
        : [...prevIds, id],
    );
  };

  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
    setError('');
  };
  console.log('newUserDetails', newUserDetails);

  const handleContinue = () => {
    const selectedSafeSpaces = safeSpaces?.filter(sp =>
      selectedSafeSpaceIds.includes(sp.id),
    );
    console.log('selectedSafeSpaces', selectedSafeSpaces);
    const result = genderIdentitySchema.safeParse(selectedSafeSpaces);
    if (!result.success) {
      console.log('result.error', result.error);
      setError(result.error?.flatten().formErrors.at(0));
      return;
    }

    setNewUserDetails({safeSpaces: selectedSafeSpaceIds});

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
            {safeSpaces?.map(el => (
              <SelectionButton
                key={el.id}
                value={el.name}
                toggle={selectedSafeSpaceIds.includes(el.id)}
                id={el.id}
                emojiIcon={el.emoji}
                selectFn={selectSafeSpace}
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
              selectedSafeSpaceIds.length === 0 ||
              selectedSafeSpaceIds.length > MAX_GENDERS
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

export default SafePlaceForScreen;
