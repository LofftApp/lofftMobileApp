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

// Styles
import {fontStyles} from '../../styles/fontStyles';
import color from '../../styles/lofftColorPallet.json';

// Components
import ScreenBackButton from '../../components/coreComponents/CoreScreens/ScreenBackButton';
import HeadlineContainer from '../../components/containers/HeadlineContainer';
import EmojiIcon from '../../components/Emojicon/EmojiIcon';
import {CoreButton} from '../../components/buttons/CoreButton';
import PaginationBar from '../../components/bars/PaginationBar';
import CustomSwitch from '../../components/coreComponents/buttons/CustomSwitch';

const SelectCityScreen = ({navigation, route}) => {
  const user = {
    preferences: route.params.selectedTagsFromScreenOne,
    gender: route.params.selectedTagsFromScreenTwo,
  };

  const [city, setCity] = useState('');
  const [districtTags, setDistrictTags] = useState([]);
  const [focusedCity, setFocusCity] = useState(false);
  const [elementArray, setElementArray] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cityPicked, setCityPicked] = useState(false);
  const [screen, setScreen] = useState(2);
  const [allDistricts, setAllDistricts] = useState(false);
  const [washedDistricts, setWashedDistricts] = useState([]);

  const cities = {
    berlin: {
      districts: [
        {id: 1, name: 'Kreuzberg', toggle: false, emoji: '🚬'},
        {id: 2, name: 'Mitte', toggle: false, emoji: '👾'},
        {id: 3, name: 'PrenzlauerBerg', toggle: false, emoji: '🧘🏽‍♀️'},
        {id: 4, name: 'Charlottenburg', toggle: false, emoji: '🫖'},
        {id: 5, name: 'Steglitz', toggle: false, emoji: '🏰'},
        {id: 6, name: 'Wedding', toggle: false, emoji: '🥷🏻'},
        {id: 7, name: 'Moabit', toggle: false, emoji: '👔'},
        {id: 8, name: 'Spandau', toggle: false, emoji: '💩'},
      ],
      flag: '🇩🇪',
    },
    paris: {
      districts: [
        {id: 1, name: '🚬 Pigalle', toggle: false},
        {id: 2, name: '🐩 Austerlitz', toggle: false},
      ],
      flag: '🇫🇷',
    },
    budapest: {
      districts: [
        {id: 1, name: '🚬 Laszo', toggle: false},
        {id: 2, name: '🐩  Buda', toggle: false},
      ],
      flag: '🇭🇺',
    },
    brussels: {
      districts: [
        {id: 1, name: '🚬 Molbeken', toggle: false},
        {id: 2, name: '🐩  Midi', toggle: false},
      ],
      flag: '🇧🇪',
    },
    brisbane: {
      districts: [
        {id: 1, name: '🚬 Newmarket', toggle: false},
        {id: 2, name: '🐩  Westend', toggle: false},
      ],
      flag: '🇦🇺',
    },
    wroclaw: {
      districts: [
        {id: 1, name: '🚬 Centrum', toggle: false},
        {id: 2, name: '🐩  Grabiyszn', toggle: false},
      ],
      flag: '🇵🇱',
    },
    warszawa: {
      districts: [
        {id: 1, name: '🚬 Chopin', toggle: false},
        {id: 2, name: '🐩  Centurn', toggle: false},
      ],
      flag: '🇵🇱',
    },
  };

  const trigerAllFlats = () => {
    selectAllDistrictsTags(allDistricts);
    setAllDistricts(!allDistricts);
  };

  const selectAllDistrictsTags = state => {
    const all = districts.map(el => {
      if (!state) {
        return {
          ...el,
          toggle: true,
        };
      } else {
        return {
          ...el,
          toggle: false,
        };
      }
    });

    setDistricts(all);
  };

  const orderedCities = Object.keys(cities)
    .sort()
    .reduce((obj, key) => {
      obj[key] = cities[key];
      return obj;
    }, {});

  // Functions
  const cityTrack = userInput => {
    if (userInput === '' || city != '') {
      setElementArray([]);
      setDistricts([]);
    }

    const creationArray = [];

    for (const [key, value] of Object.entries(orderedCities)) {
      if (key.startsWith(userInput.toLowerCase()) && userInput != '') {
        // value.forEach((el) => {
        //   console.log(el.district)
        // })
        const inputObject = {};
        inputObject.city = key;
        inputObject.flag = value.flag;
        creationArray.push(inputObject);
        setElementArray(creationArray);
      }
    }

    // setDistrictTags(tagsArray);
    setCity(userInput);
  };

  const activateDistrictDisplay = city => {
    setCityPicked(true);
    setDistricts(cities[city].districts);
    setCity(city);
    setTimeout(() => {
      setElementArray([]);
      setCityPicked(false);
    }, 0);
  };

  const handleCityFocus = () => setFocusCity(true);

  const selectedEmojis = id => {
    const targets = [];

    const preSeleted = districts.map(element => {
      if (element.id === id) {
        targets.push(element);
        return {
          ...element,
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

    const wash = preSeleted.filter(el => el.toggle);

    setDistricts(preSeleted);
    setWashedDistricts(wash);
  };

  const emojiElements = districts.map((emojiElement, index) => {
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
                    ? color.Lavendar[100]
                    : color.Black[80],
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
              ? elementArray.map((el, index) => (
                  <Pressable
                    key={index + 1}
                    onPress={() => {
                      activateDistrictDisplay(el.city);
                    }}>
                    <View
                      key={index}
                      style={[
                        index === elementArray.length - 1
                          ? styles.lastCityTag
                          : styles.cityTag,
                      ]}>
                      <Text key={index + 1}>
                        {el.flag}{' '}
                        {el.city[0].toUpperCase() +
                          el.city.substring(1, el.city.length)}
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
                      onValueChange={() => trigerAllFlats(allDistricts)}
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
                backgroundColor: color.Lavendar[100],
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
    color: color.Black[80],
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 2,
  },

  cityTag: {
    padding: 15,
    borderColor: color.Lavendar[100],
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 0,
  },
  lastCityTag: {
    borderColor: color.Lavendar[100],
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
