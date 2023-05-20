import BackButton from '@Components/buttons/BackButton';
import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Styles 🎨
import {fontStyles} from '@StyleSheets/fontStyles';
import InputFieldText from '@Components/coreComponents/inputField/InputFieldText';

// Components 🧰
import {CoreButton} from '@Components/buttons/CoreButton';

import languagesData from '@Assets/coreText/languagesText.json';
import LanguagesCard from '@Components/cards/LanguagesCard';

const LanguageSelectionScreen = ({route}) => {
  const navigation = useNavigation();
  const params = route.params;

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
      duration: 4000,
    });
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const renterText = {
    headerText: 'Tell us a bit about yourself',
    subText:
      "Select at least 3 tags that describe who you are and your lifestyles. More tags selected, more likelihood you'll find the right crowd in a Lofft!",
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView ref={scrollViewRef} style={styles.scrollViewContainer}>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={[fontStyles.headerDisplay, styles.textHeader]}>
          {params[0].headerText}
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
          <View
            style={selectedLanguages.length > 0 ? styles.notSelected : null}>
            {selectedLanguages.length > 0 && (
              <Text style={[fontStyles.headerSmall, {paddingTop: 16}]}>
                Not what you're looking for?
              </Text>
            )}
            {languages.map(language => (
              <LanguagesCard
                key={language}
                language={language}
                isSelected={selectedLanguages.includes(language)}
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
            params[1] === 'renter'
              ? navigation.navigate('AboutYouFlatHuntScreen', renterText)
              : navigation.navigate('WhereIsFlatScreen');
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
    paddingTop: 66,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    marginBottom: 153,
  },
  textHeader: {
    paddingTop: 50,
  },
  searchBar: {
    paddingTop: 16,
  },
  currentSelection: {
    paddingTop: 16,
    marginBottom: 8,
  },
  notSelected: {
    marginTop: 16,
  },
  continueButtonView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'black',
  },
  button: {
    marginBottom: 50,
  },
});

export default LanguageSelectionScreen;
