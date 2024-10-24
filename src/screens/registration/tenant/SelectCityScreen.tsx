// Needs refactoring to work with TypeScript
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

// Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import CustomSwitch from 'components/coreComponents/interactiveElements/CustomSwitch';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import Divider from 'components/bars/Divider';
import BackButton from 'components/buttons/BackButton';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Assets
import {RegistrationBackground} from 'assets';

// Data 💿
import CityDistricts from 'components/componentData/cityDistricts.json';

//Validation 🛡 ️
import {cityDistrictsSchema} from 'lib/zodSchema';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';
import {useNavigation} from '@react-navigation/native';
import {capitalize} from 'helpers/capitalize';

// Types
import {SingleCity, District, Cities} from './types';
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';

const SelectCityScreen = () => {
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Local State
  const [city, setCity] = useState('');
  const [dropdownContent, setDropdownContent] = useState<SingleCity[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [isAllDistricts, setIsAllDistricts] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState<District[]>([]);
  const [isQuery, setIsQuery] = useState(false);
  const [error, setError] = useState<string | undefined>('');

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {setNewUserDetails, newUserDetails, isLessor} = useNewUserDetails();
  const savedCity = newUserDetails.city;
  const savedDistricts = newUserDetails.districts;

  //Safe Area
  const insets = useSafeAreaInsets();

  const cities: Cities = CityDistricts;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (districts.length >= 1 && city !== '') {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [districts, city, fadeAnim]);

  useEffect(() => {
    if (savedCity.name && savedCity.name !== '') {
      setCity(`${savedCity.flag} ${capitalize(savedCity.name)}`);
      const updatedDistricts = cities[savedCity.name].districts.map(
        district => {
          return {
            ...district,
            toggle: savedDistricts.some(
              savedDistrict => savedDistrict.id === district.id,
            ),
          };
        },
      );
      setDistricts(updatedDistricts);

      const districtsSelected = updatedDistricts.filter(el => el.toggle);
      setSelectedDistricts(districtsSelected);

      const allSelected = updatedDistricts.every(district => district.toggle);
      setIsAllDistricts(allSelected);
    }
  }, [savedCity.name, savedCity.flag, cities, savedDistricts]);

  const selectAllDistrictsTags = () => {
    const allDistrictTags = districts.map(el => ({
      ...el,
      toggle: !isAllDistricts,
    }));

    setDistricts(allDistrictTags);
    setSelectedDistricts(allDistrictTags.filter(el => el.toggle));
    setIsAllDistricts(prev => !prev);
  };

  const orderedCities = Object.keys(cities)
    .sort()
    .reduce((obj: Cities, key: string) => {
      obj[key] = cities[key];
      return obj;
    }, {});

  const handleOnChangeSearch = (userInput: string) => {
    if (userInput === '' && city !== '') {
      setDropdownContent([]);
      setDistricts([]);
    }

    const creationArray: {name: string; flag: string}[] = [];

    for (const [key, value] of Object.entries(orderedCities)) {
      if (key.startsWith(userInput.toLowerCase()) && userInput !== '') {
        const inputObject = {name: '', flag: ''};
        inputObject.name = key;
        inputObject.flag = value.flag;
        creationArray.push(inputObject);
        setDropdownContent(creationArray);
      }
    }

    setCity(userInput);
    setIsQuery(true);
  };

  const activateDistrictDisplay = (cityInput: string) => {
    setDistricts(cities[cityInput.split(' ')[1].toLowerCase()].districts);
    setDropdownContent([]);
  };

  const selectFn = (id: number) => {
    const updatedDistricts = districts.map(el => {
      if (isLessor) {
        return el.id === id
          ? {...el, toggle: !el.toggle}
          : {...el, toggle: false};
      } else {
        return el.id === id ? {...el, toggle: !el.toggle} : el;
      }
    });

    setDistricts(updatedDistricts);

    const districtsSelected = updatedDistricts.filter(el => el.toggle);
    setSelectedDistricts(districtsSelected);

    const allSelected = updatedDistricts.every(district => district.toggle);
    setIsAllDistricts(allSelected);

    setError('');
  };

  const allDistrictsButtons = districts.map(district => {
    return (
      <SelectionButton
        key={district.id}
        id={district.id}
        value={district.name}
        emojiIcon={district.emoji}
        toggle={district.toggle}
        selectFn={selectFn}
      />
    );
  });

  const dropDownContent = (citiesArr: SingleCity[]) => {
    return citiesArr.map(
      cityData => `${cityData.flag} ${capitalize(cityData.name)} `,
    );
  };

  const handleDropDownPress = (value: string) => {
    setCity(value);
    setIsQuery(false);
    activateDistrictDisplay(value);
  };

  const handleClearSearch = () => {
    setCity('');
    setDistricts([]);
    setDropdownContent([]);
    setError('');
  };

  const handleBackButton = () => {
    navigation.goBack();
    setCurrentScreen(currentScreen - 1);
    setError('');
  };

  const handleContinue = () => {
    const formattedCity = {
      name: city.split(' ')[1]?.toLowerCase(),
      flag: city.split(' ')[0],
    };
    const result = cityDistrictsSchema.safeParse({
      city: formattedCity,
      districts: selectedDistricts,
    });

    if (!result.success) {
      const cityError = result.error?.flatten().fieldErrors.city?.[0];
      const districtError = result.error?.flatten().fieldErrors.districts?.[0];
      if (cityError) {
        setError(cityError);
      } else if (districtError) {
        setError(districtError);
      }
      return;
    }
    setNewUserDetails({
      city: result.data.city,
      districts: result.data.districts,
    });

    navigation.navigate(
      isLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1],
    );
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
      <View style={styles.mainContainer}>
        <HeadlineContainer
          headlineText={
            isLessor
              ? 'In which city and district is your flat located?'
              : 'Where are you looking for the flat?'
          }
        />
        <View style={styles.inputContainer}>
          <InputFieldText
            type="search"
            placeholder="Berlin for instance?"
            onChangeText={handleOnChangeSearch}
            onClear={handleClearSearch}
            value={city}
            dropdown={isQuery}
            dropDownContent={dropDownContent(dropdownContent)}
            dropDownPressAction={handleDropDownPress}
          />
        </View>

        <View style={styles.resultWrapper}>
          <Animated.View
            style={[
              styles.districtTitleContainer,
              {
                opacity: fadeAnim,
              },
            ]}>
            <Text style={[fontStyles.headerMedium]}>Districts</Text>
            {!isLessor && (
              <View style={styles.switchContainer}>
                <Text style={fontStyles.bodySmall}>Select All</Text>
                <CustomSwitch
                  value={isAllDistricts}
                  onValueChange={selectAllDistrictsTags}
                />
              </View>
            )}
          </Animated.View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.selectionContainer}>{allDistrictsButtons}</View>
          </ScrollView>
        </View>

        <Divider />
      </View>

      <View style={styles.footerContainer}>
        {error && <ErrorMessage message={error} />}
        <NewUserPaginationBar />
        <NewUserJourneyContinueButton
          value="Continue"
          disabled={districts.length === 0}
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
    paddingTop: size(10),
  },
  districtTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: size(10),
    paddingBottom: size(20),
  },

  resultWrapper: {
    marginTop: size(10),
    flex: 1,
    height: '100%',
  },

  selectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
    paddingHorizontal: size(10),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(16),
  },
  footerContainer: {
    paddingHorizontal: size(16),
    paddingTop: size(0),
    paddingBottom: size(20),
    width: '100%',
  },
});

export default SelectCityScreen;
