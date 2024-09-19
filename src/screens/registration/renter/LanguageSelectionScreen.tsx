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

const LanguageSelectionScreen = () => {
  const navigation = useNavigation<LanguageScreenNavigationProp>();

  const [searchValue, setSearchValue] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  //gets all languages from languagesText.json and filters them based on the searchValue and selectedLanguages state
  useEffect(() => {
    const languageList = Object.values(languagesData);
    const filteredLanguages = languageList.filter(
      language =>
        language.name.toLowerCase().startsWith(searchValue.toLowerCase()) &&
        !selectedLanguages.includes(language.name),
    );
    setLanguages(filteredLanguages.map(language => language.name));
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

  return (
    <View style={styles.mainContainer}>
      <ScrollView ref={scrollViewRef} style={styles.scrollViewContainer}>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={[fontStyles.headerDisplay, styles.textHeader]}>
          What {'\n'}language(s) do{'\n'}you speak?
        </Text>
        <View style={styles.searchBar}>
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
          {selectedLanguages.length > 0 && (
            <View>
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
            </View>
          )}
          <View style={selectedLanguages.length > 0 && styles.notSelected}>
            {selectedLanguages.length > 0 && (
              <Text style={[fontStyles.headerSmall, {paddingTop: 16}]}>
                Not what you're looking for?
              </Text>
            )}
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
      <View style={styles.continueButtonView}>
        <CoreButton
          value="Continue"
          onPress={() => {
            // Todo: This needs to be created or updated in the navigator
            // navigation.navigate('AboutYouFlatHuntScreen');
          }}
          style={styles.button}
          disabled={selectedLanguages.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: size(66),
    paddingHorizontal: size(16),
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    marginBottom: size(153),
  },
  textHeader: {
    paddingTop: size(20),
  },
  searchBar: {
    paddingTop: size(16),
  },
  currentSelection: {
    paddingTop: size(16),
    marginBottom: size(8),
  },
  notSelected: {
    marginTop: size(16),
  },
  continueButtonView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: size(40),
    paddingHorizontal: size(16),
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'black',
  },
  button: {
    marginBottom: size(50),
  },
});

export default LanguageSelectionScreen;
