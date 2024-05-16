// Needs refactoring to work with TypeScript
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Animated,
} from 'react-native';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import EmojiIcon from 'components/Emojicon/EmojiIcon';
import UserJourneyContinue from 'reduxFeatures/registration/UserJourneyContinue';
import UserJourneyPaginationBar from 'reduxFeatures/registration/UserJourneyPaginationBar';
import CustomSwitch from 'components/coreComponents/interactiveElements/CustomSwitch';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import FooterNavBarWithPagination from 'components/bars/FooterNavBarWithPagination';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// Data 💿
import CityDistricts from 'components/componentData/cityDistricts.json';

// Helper 🤝
import {navigationHelper} from 'helpers/navigationHelper';

const SelectCityScreen = ({navigation, route}: any) => {
  const [city, setCity] = useState('');
  const [districtTags, setDistrictTags] = useState([]);
  const [focusedCity, setFocusCity] = useState(false);
  const [elementArray, setElementArray]: Array<any> = useState([]);
  const [districts, setDistricts]: Array<any> = useState([]);
  const [cityPicked, setCityPicked] = useState(false);
  const [screen, setScreen] = useState(2);
  const [allDistricts, setAllDistricts] = useState(false);
  const [washedDistricts, setWashedDistricts] = useState([]);
  const [query, setQuery] = useState(false);

  const cities: any = CityDistricts;

  const trigerAllFlats = () => {
    selectAllDistrictsTags(allDistricts);
    setAllDistricts(!allDistricts);
  };

  const selectAllDistrictsTags = (state: any) => {
    const allDistrictTags: object[] = districts.map((el: any) => {
      if (!state) {
        return {
          ...(el as Object),
          toggle: true,
        };
      } else {
        return {
          ...(el as Object),
          toggle: false,
        };
      }
    });

    setDistricts(allDistrictTags);
  };

  const orderedCities = Object.keys(cities)
    .sort()
    .reduce((obj: any, key: string) => {
      obj[key] = cities[key];
      return obj;
    }, {});

  // Functions
  const cityTrack = (userInput: any) => {
    if (userInput === '' || city != '') {
      setElementArray([]);
      setDistricts([]);
    }

    const creationArray = [];

    for (const [key, value] of Object.entries(orderedCities)) {
      if (key.startsWith(userInput.toLowerCase()) && userInput != '') {
        const inputObject = {city: '', flag: ''};
        inputObject.city = key;
        inputObject.flag = value['flag'];
        creationArray.push(inputObject);
        setElementArray(creationArray);
      }
    }

    // setDistrictTags(tagsArray);
    setCity(userInput);
  };

  const activateDistrictDisplay = (city: any) => {
    setCityPicked(true);
    setDistricts(cities[city.split(' ')[1].toLowerCase()].districts);
    setCity(city);
    setTimeout(() => {
      setElementArray([]);
      setCityPicked(false);
    }, 0);
  };

  const handleCityFocus = () => setFocusCity(true);

  const selectedEmojis = (id: any) => {
    const targets = [];

    const preSeleted: any[] = districts.map((element: any) => {
      if (element.id === id) {
        targets.push(element);
        return {
          ...(element as object),
          toggle: !element.toggle,
        };
      } else {
        // const targetIndex = targets.map(e => e.hello).indexOf(id);
        // if (targetIndex > -1) {
        //   targets.splice(targetIndex,1);
        // }
        return element;
      }
    });

    const wash: any = preSeleted.filter(el => el.toggle);

    setDistricts(preSeleted);
    setWashedDistricts(wash);
  };

  const emojiElements = districts.map((emojiElement: any, index: number) => {
    return (
      <EmojiIcon
        key={index + 1}
        id={emojiElement.id}
        value={emojiElement.name}
        emojiIcon={emojiElement.emoji}
        toggle={emojiElement.toggle}
        selectedEmojis={selectedEmojis}
      />
    );
  });

  const cityUsableData = (data: any) => {
    return data.map((cityData: object) => {
      return `${cityData.flag} ${cityData.city
        .charAt(0)
        .toUpperCase()}${cityData.city.slice(1)}`;
    });
  };

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeadlineContainer
          headlineText={`Where are you looking for ${''} the flat?`}
          subDescription={''}
        />
        <View>
          <InputFieldText
            type="search"
            placeholder="Berlin for instance?"
            onChangeText={(t: string) => {
              cityTrack(t);
              setQuery(true);
            }}
            onClear={() => {
              setCity('');
              setDistricts([]);
            }}
            value={
              city && city in cities
                ? cities[city].flag +
                  ' ' +
                  city[0].toUpperCase() +
                  city.substring(1, city.length)
                : city
            }
            dropdown={query}
            dropDownContent={cityUsableData(elementArray)}
            dropDownPressAction={(value: string) => {
              setCity(value);
              setQuery(false);
              activateDistrictDisplay(value);
            }}
          />
        </View>

        {districts.length >= 1 ? (
          <View style={{marginTop: 15}}>
            <Animated.View // Special animatable View
              style={{
                opacity: fadeAnim, // Bind opacity to animated value
              }}>
              <View style={styles.options}>
                <Text
                  style={[
                    fontStyles.headerMedium,
                    {marginTop: 15, marginBottom: 20},
                  ]}>
                  Districts
                </Text>
                <View style={styles.switchContainer}>
                  <CustomSwitch
                    value={allDistricts}
                    // onValueChange={() => trigerAllFlats(allDistricts)}
                    onValueChange={() => trigerAllFlats()}
                  />
                  <Text style={{marginLeft: 20}}>Select All</Text>
                </View>
              </View>
            </Animated.View>
            <View style={styles.emojiContainer}>{emojiElements}</View>
          </View>
        ) : null}
      </ScrollView>

      <FooterNavBarWithPagination
        onPress={(targetScreen: any) =>
          navigationHelper(navigation, targetScreen)
        }
        disabled={districts.length === 0}
        details={{districts: washedDistricts}}
      />
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  questionInputStyle: {
    padding: 15,
    color: Color.Black[80],
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 2,
  },

  cityTag: {
    padding: 15,
    borderColor: Color.Lavendar[100],
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 0,
  },
  lastCityTag: {
    borderColor: Color.Lavendar[100],
    borderBottomWidth: 2,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    padding: 15,
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 150,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SelectCityScreen;
