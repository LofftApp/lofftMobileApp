import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Redux 📦
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';

// Components 🪢
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import Divider from 'components/bars/Divider';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

// StylesSheet 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Assets 🎨
import {RegistrationBackground} from 'assets';

// Data 💿
import {newUserScreens} from 'navigationStacks/newUserScreens';

// Validation 🛡  ️
import {characteristicsSchema} from 'lib/zodSchema';

// Constants 📊
import {
  MAX_SELECTED_CHARS,
  MIN_SELECTED_CHARS,
} from 'components/componentData/constants';
// Helper 🤝
import {size} from 'react-native-responsive-sizes';

// Types 🏷 ️
import {
  NewUserJourneyStackNavigation,
  SettingsScreenNavigationProp,
} from '../../navigationStacks/types';
import {useUserType} from 'reduxFeatures/user/useUserType';

const AboutUserFlatScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;
  //Navigation
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

  // initial state
  const {data} = useGetAssetsQuery();
  const characteristics = data?.characteristics;

  // Local State
  const [selectedCharsIds, setSelectedCharsIds] = useState<number[]>([]);
  const [error, setError] = useState<string | undefined>('');

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {newUserDetails, setNewUserDetails, isNewUserLessor, setNewUserType} =
    useNewUserDetails(isLessor, edit);
  const savedCharsIds = newUserDetails.characteristics;
  console.log('newHHHYY', newUserDetails);
  //Safe Area
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (savedCharsIds.length) {
      setSelectedCharsIds(savedCharsIds);
    }
  }, [savedCharsIds]);

  const handleBackButton = () => {
    const previousScreen = currentScreen - 1;
    navigation.goBack();
    setCurrentScreen(previousScreen);
    setError('');
  };

  const handleSelectChars = (id: number) => {
    setSelectedCharsIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(charId => charId !== id)
        : [...prevIds, id],
    );
  };

  const handleContinue = () => {
    const selectedChars = characteristics?.filter(chars =>
      selectedCharsIds.includes(chars.id),
    );
    console.log('selectedChars', selectedChars);
    const result = characteristicsSchema.safeParse(selectedChars);
    if (!result.success) {
      setError(result.error?.flatten().formErrors.at(0));
      return;
    }
    if (edit &&isLessor) {
      setNewUserType
    }

    setNewUserDetails({characteristics: selectedCharsIds});
    if (edit) {
      navigation.navigate('NewUserNavigator', {
        screen: 'FlatFeaturesScreen',
        params: {edit: true},
      });
    } else {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);

      setCurrentScreen(currentScreen + 1);
    }

    setError('');
  };

  const charsButtons = characteristics?.map(char => {
    return (
      <SelectionButton
        key={char.id}
        id={char.id}
        emojiIcon={char.emoji}
        value={char.name}
        toggle={selectedCharsIds.includes(char.id)}
        selectFn={handleSelectChars}
        disabled={
          selectedCharsIds.length === MAX_SELECTED_CHARS &&
          !selectedCharsIds.includes(char.id)
        }
      />
    );
  });
  return (
    <View
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        {
          paddingTop: insets.top,
        },
      ]}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={CoreStyleSheet.screenContainer}>
        <HeadlineContainer
          headlineText={
            isNewUserLessor || isLessor
              ? 'Tell us a bit about your flat'
              : 'Tell us a bit about yourself'
          }
          subDescription={
            isNewUserLessor || isLessor
              ? `Select at least ${MIN_SELECTED_CHARS} tags that describe your Lofft lifestyles. More tags selected, more likelihood you'll find the right crowd!`
              : `Select at least ${MIN_SELECTED_CHARS} tags that describe who you are and your lifestyles. More tags selected, more likelihood you'll find the right crowd in a Lofft!`
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.selectionContainer}>{charsButtons}</View>
        </ScrollView>
        <Divider />
        <View style={[styles.footerContainer]}>
          <View style={styles.tagInfoContainer}>
            <Text
              style={
                fontStyles.bodySmall
              }>{`* Select at least ${MIN_SELECTED_CHARS} tags`}</Text>
          </View>
          {error ||
            (selectedCharsIds.length === MAX_SELECTED_CHARS && (
              <ErrorMessage
                message={
                  error ||
                  `You have selected maximum of ${MAX_SELECTED_CHARS} tags`
                }
              />
            ))}
          {!edit && <NewUserPaginationBar />}

          <NewUserJourneyContinueButton
            value="Continue"
            disabled={selectedCharsIds.length < MIN_SELECTED_CHARS}
            onPress={handleContinue}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    marginTop: size(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: size(10),
  },
  tagInfoContainer: {
    marginBottom: size(5),
  },
  footerContainer: {
    paddingTop: size(20),
  },
});

export default AboutUserFlatScreen;
