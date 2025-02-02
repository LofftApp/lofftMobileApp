import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Redux 📦
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';

// Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

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

// Helper 🤝
import {useNavigation} from '@react-navigation/native';
import {size} from 'react-native-responsive-sizes';

//Constants 📊
import {MIN_SELECTED_FEATURES} from 'components/componentData/constants';

// Validation 🛡  ️
import {featuresSchema} from 'lib/zodSchema';

// Types 🧩
import {
  NewUserJourneyStackNavigation,
  SettingsScreenNavigationProp,
} from 'navigationStacks/types';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

const FlatFeaturesScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;
  // Navigation
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

  //initial State
  const {data} = useGetAssetsQuery();
  const features = data?.features;
  //Local State
  const [selectedFeaturesIds, setSelectedFeaturesIds] = useState<number[]>([]);
  const [error, setError] = useState<string | undefined>('');

  //Redux
  const {isLessor} = useUserType();
  const {isNewUserLessor, newUserDetails, setNewUserDetails} =
    useNewUserDetails(isLessor, edit);
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {
    data: advert,
    isLoading,
    isError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit,
  });
  const savedFeaturesIds =
    newUserDetails.userType === 'lessor'
      ? newUserDetails.flatFeatures
      : newUserDetails.filter;

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (savedFeaturesIds?.length) {
      setSelectedFeaturesIds(savedFeaturesIds);
    }

    if (edit && advert && advert.flat.features.length > 0) {
      setSelectedFeaturesIds(advert?.flat.features.map(feat => feat.id) ?? []);
    }
  }, [savedFeaturesIds, advert, edit]);

  const handleSelectFeatures = (id: number) => {
    setSelectedFeaturesIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(featId => featId !== id)
        : [...prevIds, id],
    );
  };

  const featuresButtons = features?.map(feat => {
    return (
      <SelectionButton
        key={feat.id}
        id={feat.id}
        emojiIcon={feat.emoji}
        value={feat.name}
        toggle={selectedFeaturesIds.includes(feat.id)}
        selectFn={handleSelectFeatures}
      />
    );
  });

  const handleBackButton = () => {
    if (!edit) {
      const previousScreen = currentScreen - 1;
      setCurrentScreen(previousScreen);
    }
    navigation.goBack();
    setError('');
  };

  const handleContinue = () => {
    const selectedFeatures = features?.filter(feat =>
      selectedFeaturesIds.includes(feat.id),
    );
    const result = featuresSchema.safeParse(selectedFeatures);
    if (!result.success) {
      setError(result.error?.flatten().formErrors[0]);
      return;
    }

    if (newUserDetails.userType === 'lessor') {
      setNewUserDetails({flatFeatures: selectedFeaturesIds});
    } else {
      setNewUserDetails({filter: selectedFeaturesIds});
    }

    if (edit) {
      navigation.goBack();
      navigation.goBack();
    } else {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
    }

    setError('');
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return (
      <NotFoundComponent
        message="We couldn't retrieve the advert details"
        backButton
        onPress={handleBackButton}
      />
    );
  }

  return (
    <View
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        {
          paddingTop: insets.top,
          // paddingBottom: insets.bottom,
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
              ? 'What is your flat like?'
              : 'What is your ideal flat like?'
          }
          subDescription={
            isNewUserLessor || isLessor
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
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={edit ? 'Save' : 'Continue'}
            disabled={selectedFeaturesIds.length < MIN_SELECTED_FEATURES}
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

export default FlatFeaturesScreen;
