import BackButton from 'components/buttons/BackButton';
import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Styles 🎨
import {fontStyles} from 'styleSheets/fontStyles';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';

// Components 🧰
import {CoreButton} from 'components/buttons/CoreButton';

import languagesData from 'Assets/coreText/languagesText.json';
import LanguagesCard from 'components/cards/LanguagesCard';

import {LanguageScreenNavigationProp} from '../../../../navigationStacks/types';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';
import {RegistrationBackground} from 'assets';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import {useNewUserType} from 'reduxFeatures/registration/useNewUserType';
import Divider from 'components/bars/Divider';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const LanguageSelectionScreen = () => {
  const navigation = useNavigation<LanguageScreenNavigationProp>();
  const userType = useNewUserType();
  const isLessor = userType === 'lessor';
  const insets = useSafeAreaInsets(); // Get the safe area insets dynamically

  const [searchValue, setSearchValue] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //gets all languages from languagesText.json and filters them based on the searchValue and selectedLanguages state
  useEffect(() => {
    setIsLoading(true);
    const languageList = Object.values(languagesData);
    const filteredLanguages = languageList.filter(
      language =>
        language.name.toLowerCase().startsWith(searchValue.toLowerCase()) &&
        !selectedLanguages.includes(language.name),
    );
    setLanguages(filteredLanguages.map(language => language.name));
    setIsLoading(false);
  }, [searchValue, selectedLanguages]);

  const handleSelectedLanguages = (l: string) => {
    setSelectedLanguages(prevSelectedLanguages => {
      if (prevSelectedLanguages.includes(l)) {
        return prevSelectedLanguages.filter(
          selectedLanguage => selectedLanguage !== l,
        );
      } else {
        return [...prevSelectedLanguages, l];
      }
    });
    scrollViewRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
      // duration: 4000,
    });
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    <LoadingComponent />;
  }

  return (
    <View
      style={[
        styles.safeAreaContainer,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <BackButton onPress={navigation.goBack} />
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
            onChangeText={(newValue: any) => {
              setSearchValue(newValue);
            }}
            onClear={() => {
              setSearchValue('');
            }}
          />
        </View>

        <ScrollView ref={scrollViewRef}>
          {selectedLanguages.length > 0 && (
            <>
              <Text style={[fontStyles.headerSmall, styles.currentSelection]}>
                Your current Selection:
              </Text>
              <View>
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
      </View>
      <Divider />
      <View style={styles.continueButtonView}>
        <CoreButton
          value="Continue"
          onPress={() => {
            // Todo: This needs to be created or updated in the navigator
            navigation.navigate('AboutYouFlatHuntScreen');
          }}
          disabled={selectedLanguages.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
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
  },

  currentSelection: {
    marginBottom: size(8),
  },
  notSelected: {
    marginTop: size(16),
  },
  continueButtonView: {
    paddingHorizontal: size(16),
    paddingTop: size(20),
    paddingBottom: size(10),
  },
});

export default LanguageSelectionScreen;
