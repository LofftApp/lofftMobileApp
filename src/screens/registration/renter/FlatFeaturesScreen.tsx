import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Redux 📦
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';

// Screens 📺
import {newUserScreens} from 'components/componentData/newUserScreens';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import Divider from 'components/bars/Divider';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';

//Assets 🎨
import {RegistrationBackground} from 'assets';

// Styles 🖼  ️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

// Data 💿
import flatPreferences from 'components/componentData/flatPreferences.json';

// Helper 🤝
import {useNavigation} from '@react-navigation/native';
import {size} from 'react-native-responsive-sizes';

//Constants 📊
import {MIN_SELECTED_FEATURES} from 'components/componentData/constants';

// Validation 🛡  ️
import {featuresSchema} from 'lib/zodSchema';

// Types 🧩
import {FlatFeature} from './types';
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';

const FlatFeaturesScreen = () => {
  // Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Local State
  const features = flatPreferences;
  const [featuresState, setFeaturesState] = useState(features);
  const [selectedFeatures, setSelectedFeatures] = useState<FlatFeature[]>([]);
  const [error, setError] = useState<string | undefined>('');

  //Redux
  const {isLessor, newUserDetails, setNewUserDetails} = useNewUserDetails();
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const savedFeatures =
    newUserDetails.userType === 'lessor'
      ? newUserDetails.flatFeatures
      : newUserDetails.filter;

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (savedFeatures && savedFeatures.length > 0) {
      setSelectedFeatures(savedFeatures);

      const updatedCharsState = features.map(feat => ({
        ...feat,
        toggle: savedFeatures.some(savedFeat => savedFeat.id === feat.id),
      }));

      setFeaturesState(updatedCharsState);
    } else {
      setSelectedFeatures([]);
    }
  }, [savedFeatures, features]);

  const selectFeatures = (id: number) => {
    const updatedFeatures = featuresState.map(element => {
      if (element.id === id) {
        return {
          ...element,
          toggle: !element.toggle,
        };
      } else {
        return element;
      }
    });

    const featuresSelected = updatedFeatures.filter(el => el.toggle);

    setSelectedFeatures(featuresSelected);
    setFeaturesState(updatedFeatures);
  };

  const featuresButtons = featuresState.map(feature => {
    return (
      <SelectionButton
        key={feature.id}
        id={feature.id}
        emojiIcon={feature.emoji}
        value={feature.value}
        toggle={feature.toggle}
        selectFn={selectFeatures}
      />
    );
  });

  const handleBackButton = () => {
    const previousScreen = currentScreen - 1;
    navigation.goBack();
    setCurrentScreen(previousScreen);
    setError('');
  };

  const handleContinue = () => {
    const result = featuresSchema.safeParse(selectedFeatures);
    if (!result.success) {
      setError(result.error?.flatten().formErrors[0]);
      return;
    }

    if (newUserDetails.userType === 'lessor') {
      setNewUserDetails({flatFeatures: result.data});
    } else {
      setNewUserDetails({filter: result.data});
    }

    const screen = isLessor
      ? newUserScreens.lessor[currentScreen + 1]
      : newUserScreens.renter[currentScreen + 1];
    navigation.navigate(screen);

    setCurrentScreen(currentScreen + 1);

    setError('');
  };

  return (
    <View
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
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
            isLessor
              ? 'What is your flat like?'
              : 'What is your ideal flat like?'
          }
          subDescription={
            isLessor
              ? 'Select all the tags that match your place.'
              : 'Select all the tags that match the place you are looking for.'
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.selectionContainer}>{featuresButtons}</View>
        </ScrollView>

        <Divider />
        <View style={styles.footerContainer}>
          <View style={styles.tagInfoContainer}>
            <Text
              style={
                fontStyles.bodySmall
              }>{`* Select at least ${MIN_SELECTED_FEATURES} tags`}</Text>
          </View>
          {error && <ErrorMessage message={error} />}
          <NewUserPaginationBar />
          <NewUserJourneyContinueButton
            value="Continue"
            disabled={selectedFeatures.length < MIN_SELECTED_FEATURES}
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
    paddingBottom: size(10),
  },
});

export default FlatFeaturesScreen;
