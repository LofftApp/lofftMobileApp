import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
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

const LanguageSelectionScreen = () => {
  // Local State
  const [searchValue, setSearchValue] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>('');

  // Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  // Redux
  const {data} = useGetAssetsQuery();
  const languagesData = data?.languages;
  const {isLessor, newUserDetails, setNewUserDetails} = useNewUserDetails();
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const savedLanguages = newUserDetails.languages;

  // Safe Area
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (savedLanguages && savedLanguages.length > 0) {
      setSelectedLanguages(savedLanguages);
    }
  }, [savedLanguages]);

  //gets all languages from languagesText.json and filters them based on the searchValue and selectedLanguages state
  useEffect(() => {
    setIsLoading(true);
    if (languagesData) {
      const languageList = Object.values(languagesData);
      const filteredLanguages = languageList.filter(
        language =>
          language.name.toLowerCase().startsWith(searchValue.toLowerCase()) &&
          !selectedLanguages.includes(language.name),
      );
      setLanguages(filteredLanguages.map(language => language.name));
    }
    setIsLoading(false);
  }, [searchValue, selectedLanguages, languagesData]);

  const handleSelectedLanguages = (l: string) => {
    const updatedLanguages = selectedLanguages.includes(l)
      ? selectedLanguages.filter(selectedLanguage => selectedLanguage !== l)
      : [...selectedLanguages, l];
    setSelectedLanguages(updatedLanguages);

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
    const result = languagesSchema.safeParse(selectedLanguages);
    if (!result.success) {
      setError(result.error?.flatten().formErrors.at(0));
      return;
    }
    setNewUserDetails({languages: result.data});

    const screen = isLessor
      ? newUserScreens.lessor[currentScreen + 1]
      : newUserScreens.tenant[currentScreen + 1];
    navigation.navigate(screen);

    setCurrentScreen(currentScreen + 1);

    handleClearSearch();
    setError('');
  };

  if (isLoading) {
    return <LoadingComponent />;
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
            isLessor
              ? 'What are the common language(s) in your Lofft?'
              : 'What language(s) do you speak?'
          }
        />

        <View style={styles.inputContainer}>
          <InputFieldText
            type="search"
            placeholder="Search for your language"
            value={searchValue}
            onChangeText={handleSearch}
            onClear={handleClearSearch}
          />
        </View>

        <ScrollView ref={scrollViewRef}>
          {selectedLanguages.length > 0 && (
            <>
              <Text style={[fontStyles.headerSmall, styles.currentSelection]}>
                Your current Selection:
              </Text>
              <View style={styles.languagesContainer}>
                {selectedLanguages.map(language => (
                  <LanguagesCard
                    key={language}
                    language={language}
                    selected={selectedLanguages.includes(language)}
                    handleSelectedLanguages={handleSelectedLanguages}
                  />
                ))}
              </View>
            </>
          )}
          <Divider />
          <View style={selectedLanguages.length > 0 && styles.notSelected}>
            {selectedLanguages.length > 0 && (
              <Text style={fontStyles.headerSmall}>Other languages</Text>
            )}
            <View style={styles.languagesContainer}>
              {languages.map(language => (
                <LanguagesCard
                  key={language}
                  language={language}
                  selected={selectedLanguages.includes(language)}
                  handleSelectedLanguages={handleSelectedLanguages}
                />
              ))}
            </View>
          </View>
        </ScrollView>
        <Divider />
      </View>
      <View style={styles.footerContainer}>
        {error && <ErrorMessage message={error} />}
        <UserJourneyPaginationBar />

        <NewUserJourneyContinueButton
          value="Continue"
          disabled={selectedLanguages.length === 0}
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
    paddingTop: size(20),
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
