// Needs refactoring to work with TypeScript
import React, {useState, useEffect, useRef, useMemo} from 'react';
import {View, Text, StyleSheet, ScrollView, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';

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

//Validation 🛡 ️
import {cityDistrictsSchema} from 'lib/zodSchema';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';
import {useNavigation} from '@react-navigation/native';
import {capitalize} from 'helpers/capitalize';

// Types

import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {CityAssets, District} from 'reduxFeatures/assets/types';

const SelectCityScreen = () => {
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  // initial state
  const {data} = useGetAssetsQuery();
  const cities: CityAssets[] = useMemo(() => data?.cities || [], [data]);

  //Local State
  const [city, setCity] = useState('');
  const [selectedCityId, setSelectedCityId] = useState<number | undefined>(
    undefined,
  );
  const [dropdownContent, setDropdownContent] = useState<
    CityAssets[] | Partial<CityAssets>[]
  >([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [isAllDistricts, setIsAllDistricts] = useState(false);
  const [selectedDistrictIds, setSelectedDistrictIds] = useState<number[]>([]);

  const [isQuery, setIsQuery] = useState(false);
  const [error, setError] = useState<string | undefined>('');

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {setNewUserDetails, newUserDetails, isLessor} = useNewUserDetails();
  const savedCityId = newUserDetails.city;
  const savedDistrictIds = newUserDetails.districts;

  //Safe Area
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (savedCityId) {
      const matchedCity = cities.find(c => c.id === savedCityId);

      if (matchedCity) {
        setCity(`${matchedCity.flag} ${capitalize(matchedCity.name)}`);
        setSelectedCityId(matchedCity.id);
        setDistricts(matchedCity.districts);
        setSelectedDistrictIds(savedDistrictIds);
        setIsAllDistricts(
          savedDistrictIds.length === matchedCity.districts.length,
        );
      }
    }
  }, [savedCityId, savedDistrictIds, cities]);

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

  const selectAllDistrictsTags = () => {
    if (isAllDistricts) {
      setSelectedDistrictIds([]);
    } else {
      setSelectedDistrictIds(districts.map(dist => dist.id));
    }

    setIsAllDistricts(!isAllDistricts);
  };

  const handleOnChangeSearch = (input: string) => {
    setCity(input);
    setIsQuery(true);
    if (input) {
      const filteredCities = cities.filter(c =>
        c.name.toLowerCase().startsWith(input.toLowerCase()),
      );
      setDropdownContent(
        filteredCities.length > 0
          ? filteredCities
          : [{name: 'No results found', flag: ''}],
      );
    } else {
      setDropdownContent([]);
      setDistricts([]);
    }
  };

  const selectFn = (id: number) => {
    let updatedDistricts: number[] = [];
    if (isLessor) {
      updatedDistricts = selectedDistrictIds.includes(id) ? [] : [id];
    } else {
      updatedDistricts = selectedDistrictIds.includes(id)
        ? selectedDistrictIds.filter(distId => distId !== id)
        : [...selectedDistrictIds, id];
    }
    setSelectedDistrictIds(updatedDistricts);
    setIsAllDistricts(updatedDistricts.length === districts.length);
    setError('');
  };

  const allDistrictsButtons = districts.map(district => {
    return (
      <SelectionButton
        key={district.id}
        id={district.id}
        value={district.name}
        emojiIcon={district.emoji}
        toggle={selectedDistrictIds.includes(district.id)}
        selectFn={selectFn}
      />
    );
  });

  const formattedDropDownContent = (citiesArr: CityAssets[]) =>
    citiesArr.map(cityData => `${cityData.flag} ${capitalize(cityData.name)} `);

  const handleDropDownPress = (value: string) => {
    const matchedCity = cities.find(
      c => c.name.toLowerCase() === value.split(' ')[1].toLowerCase(),
    );
    if (matchedCity) {
      setCity(value);
      setSelectedCityId(matchedCity.id);
      setDistricts(matchedCity.districts);
      setIsQuery(false);
      setIsAllDistricts(false);
    }
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
    const selectedCity = cities.find(c => c.id === selectedCityId);
    const selectedDistricts = districts.filter(d =>
      selectedDistrictIds.includes(d.id),
    );

    const result = cityDistrictsSchema.safeParse({
      city: selectedCity,
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
      city: selectedCityId,
      districts: selectedDistrictIds,
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
            dropDownContent={formattedDropDownContent(
              dropdownContent as CityAssets[],
            )}
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
    paddingBottom: size(20),
    width: '100%',
  },
});

export default SelectCityScreen;
