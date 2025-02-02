import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, View, Text, StyleSheet, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Redux
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';
// Styles 🎨
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Screens  📺
import {newUserScreens} from '../../navigationStacks/newUserScreens';

// Components 🧰
import BackButton from 'components/buttons/BackButton';
import LanguagesCard from 'components/cards/LanguagesCard';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import Divider from 'components/bars/Divider';
import UserJourneyPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

//Assets 🎨
// import languagesData from 'Assets/coreText/languagesText.json';
import {RegistrationBackground} from 'assets';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

//Validation 🛡️
import {languagesSchema} from 'lib/zodSchema';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import {useFadeInAnimation} from 'hooks/useFadeInAnimation';

const LanguageSelectionScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;
  // Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  // Local State
  const [searchValue, setSearchValue] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [languagesIds, setLanguagesIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>('');

  // initial state
  const {data} = useGetAssetsQuery();
  const languagesData = data?.languages;

  // Redux
  const {isLessor} = useUserType();
  const {isNewUserLessor, newUserDetails, setNewUserDetails} =
    useNewUserDetails(isLessor, edit);
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {
    data: advert,
    isLoading: advertIsLoading,
    isError: advertIsError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit,
    refetchOnMountOrArgChange: true,
  });
  const savedLanguages = newUserDetails.languages;
  console.log('savedLanguages', savedLanguages);
  console.log('newUserDetails', newUserDetails);

  // Safe Area
  const insets = useSafeAreaInsets();

  const {fadeInAnim} = useFadeInAnimation(!isLoading);

  useEffect(() => {
    if (savedLanguages && savedLanguages.length > 0) {
      setLanguagesIds(savedLanguages);
    }
  }, [savedLanguages]);

  useEffect(() => {
    if (languagesData) {
      setIsLoading(true);
      const filteredLanguages = languagesData
        .filter(
          language =>
            language.name.toLowerCase().startsWith(searchValue.toLowerCase()) &&
            !languagesIds.includes(language.id),
        )
        .map(language => language.name);
      setLanguages(filteredLanguages);
      setIsLoading(false);
    }
  }, [searchValue, languagesIds, languagesData]);

  const handleSelectedLanguages = (id: number) => {
    setLanguagesIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(langId => langId !== id)
        : [...prevIds, id],
    );

    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleBackButton = () => {
    navigation.goBack();

    setCurrentScreen(1);
    handleClearSearch();
    setError('');
  };

  const handleContinue = () => {
    const selectedLanguages = languagesData?.filter(lang =>
      languagesIds.includes(lang.id),
    );
    const result = languagesSchema.safeParse(selectedLanguages);
    if (!result.success) {
      setError(result.error?.flatten().formErrors.at(0));
      return;
    }
    setNewUserDetails({languages: languagesIds});

    if (edit) {
      navigation.goBack();
    } else {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
    }

    handleClearSearch();
    setError('');
  };

  const selectedLanguageNames = languagesData
    ?.filter(language => languagesIds.includes(language.id))
    .map(language => language.name);

  if (isLoading || advertIsLoading) {
    return <LoadingComponent />;
  }

  if (advertIsError) {
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
          paddingBottom: insets.bottom,
        },
      ]}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={styles.mainContainer}>
        <HeadlineContainer
          headlineText={
            isNewUserLessor || isLessor
              ? 'What are the common language(s) in your Lofft?'
              : 'What language(s) do you speak?'
          }
        />

        <Animated.View style={[styles.inputContainer, {opacity: fadeInAnim}]}>
          <InputFieldText
            type="search"
            placeholder="Search for your language"
            value={searchValue}
            onChangeText={handleSearch}
            onClear={handleClearSearch}
          />
        </Animated.View>

        <ScrollView ref={scrollViewRef}>
          {selectedLanguageNames && selectedLanguageNames.length > 0 && (
            <>
              <Text style={[fontStyles.headerSmall, styles.currentSelection]}>
                Your current Selection:
              </Text>
              <Animated.View
                style={[styles.languagesContainer, {opacity: fadeInAnim}]}>
                {selectedLanguageNames?.map(language => (
                  <LanguagesCard
                    key={language}
                    language={language}
                    selected={true}
                    handleSelectedLanguages={() =>
                      handleSelectedLanguages(
                        languagesData?.find(l => l.name === language)?.id || 0,
                      )
                    }
                  />
                ))}
              </Animated.View>
            </>
          )}
          <Divider />
          <View
            style={
              selectedLanguageNames &&
              selectedLanguageNames?.length > 0 &&
              styles.notSelected
            }>
            {selectedLanguageNames && selectedLanguageNames.length > 0 && (
              <Text style={fontStyles.headerSmall}>Other languages</Text>
            )}
            <Animated.View
              style={[styles.languagesContainer, {opacity: fadeInAnim}]}>
              {languages.map(language => (
                <LanguagesCard
                  key={language}
                  language={language}
                  selected={false}
                  handleSelectedLanguages={() =>
                    handleSelectedLanguages(
                      languagesData?.find(l => l.name === language)?.id || 0,
                    )
                  }
                />
              ))}
            </Animated.View>
          </View>
        </ScrollView>
        <Divider />
      </View>
      <View style={styles.footerContainer}>
        {error && <ErrorMessage message={error} />}
        {!edit && <UserJourneyPaginationBar />}

        <NewUserJourneyContinueButton
          value={edit ? 'Save' : 'Continue'}
          disabled={languagesIds.length === 0}
          onPress={handleContinue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: size(20),
    paddingHorizontal: size(16),
  },
  inputContainer: {
    paddingTop: size(5),
    paddingBottom: size(10),
  },

  languagesContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: size(10),
    width: '100%',
  },

  currentSelection: {
    marginBottom: size(8),
  },
  notSelected: {
    marginTop: size(16),
  },
  footerContainer: {
    paddingHorizontal: size(16),
    paddingBottom: size(20),
    alignItems: 'center',
    width: '100%',
  },
});

export default LanguageSelectionScreen;
