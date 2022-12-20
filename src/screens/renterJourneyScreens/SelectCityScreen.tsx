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
import ScreenBackButton from '@Screens/ScreenBackButton';

// Components 🪢
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import EmojiIcon from '@Components/Emojicon/EmojiIcon';
import {CoreButton} from '@Components/buttons/CoreButton';
import PaginationBar from '@Components/bars/PaginationBar';
import CustomSwitch from '@Components/coreComponents/interactiveElements/CustomSwitch';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

// Data 💿
import CityDistricts from '@Components/componentData/cityDistricts.json';

const SelectCityScreen = ({navigation, route}: any) => {
  const user = {
    preferences: route.params.selectedTagsFromScreenOne,
    gender: route.params.selectedTagsFromScreenTwo,
  };

  const [city, setCity] = useState('');
  const [districtTags, setDistrictTags] = useState([]);
  const [focusedCity, setFocusCity] = useState(false);
  const [elementArray, setElementArray]: Array<any> = useState([]);
  const [districts, setDistricts]: Array<any> = useState([]);
  const [cityPicked, setCityPicked] = useState(false);
  const [screen, setScreen] = useState(2);
  const [allDistricts, setAllDistricts] = useState(false);
  const [washedDistricts, setWashedDistricts] = useState([]);

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
      if (
        key.startsWith(userInput.toLowerCase()) &&
        userInput != '' &&
        value === typeof String
      ) {
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
    setDistricts(cities[city].districts);
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
      <SafeAreaView style={{position: 'relative', height: '100%'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeadlineContainer
            headlineText={`Where are you looking for ${''} the flat?`}
            subDescription={''}
          />
          <View>
            <TextInput
              style={[
                styles.questionInputStyle,
                fontStyles.bodyMedium,
                {
                  borderColor: focusedCity
                    ? Color.Lavendar[100]
                    : Color.Black[80],
                  borderBottomLeftRadius: elementArray.length >= 1 ? 0 : 12,
                  borderBottomRightRadius: elementArray.length >= 1 ? 0 : 12,
                },
              ]}
              keyboardType="default"
              placeholder="🔎 Berlin for instance?"
              autoCapitalize="words"
              value={
                city && city in cities
                  ? cities[city].flag +
                    ' ' +
                    city[0].toUpperCase() +
                    city.substring(1, city.length)
                  : city
              }
              onChangeText={text => cityTrack(text)}
              onFocus={handleCityFocus}
            />
            {elementArray.length >= 1
              ? elementArray.map((el: any, index: number) => (
                  <Pressable
                    key={index + 1}
                    onPress={() => {
                      activateDistrictDisplay(el['city']);
                    }}>
                    <View
                      key={index}
                      style={[
                        index === elementArray.length - 1
                          ? styles.lastCityTag
                          : styles.cityTag,
                      ]}>
                      <Text key={index + 1}>
                        {el['flag']}{' '}
                        {el['city'][0].toUpperCase() +
                          el['city'].substring(1, el['city'].length)}
                      </Text>
                    </View>
                  </Pressable>
                ))
              : null}
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

        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 20,
            backgroundColor: 'white',
            height: 160,
          }}>
          <View style={{marginTop: 10, marginBottom: 54}}>
            <PaginationBar screen={screen} />
          </View>
          {districts.length >= 1 ? (
            <CoreButton
              value="Continue"
              style={{
                backgroundColor: Color.Lavendar[100],
                borderWidth: 0,
                width: '100%',
              }}
              textStyle={[fontStyles.headerSmall, {color: 'white'}]}
              disabled={false}
              onPress={() => {
                navigation.navigate('FinderBudgetScreen', {
                  selectedPreferences: user.preferences,
                  gender: user.gender,
                  selectedDistricts: washedDistricts,
                });
              }}
            />
          ) : (
            <CoreButton
              value="Continue"
              style={{
                backgroundColor: '#BBBBBB',
                borderWidth: 0,
                width: '100%',
              }}
              textStyle={[fontStyles.headerSmall, {color: 'white'}]}
              disabled={true}
              onPress={() => {
                navigation.navigate('', {});
              }}
            />
          )}
        </View>
      </SafeAreaView>
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
