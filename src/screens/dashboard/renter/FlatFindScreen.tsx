import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

// Redux 🏪
import {useGetAdvertsQuery} from 'reduxFeatures/adverts/advertApi';

// Helper 🥷🏻
import {size} from 'react-native-responsive-sizes';

// Screens 📺
import FlatListSubScreen from '../renter/SubScreens/FlatListSubScreen';

// Components 🪢
import FilterButton from 'components/buttons/FilterButton';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import AdvertMap from 'components/Maps/AdvertMap';
import HeaderPageContentSwitch from 'components/buttons/HeaderPageContentSwitch';
import SearchFilterModal from 'components/modals/SearchFilterModal';
import LoadingComponent from 'components/LoadingAndError/LoadingComponent';
import ErrorComponent from 'components/LoadingAndError/ErrorComponent';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Types 🏷️

const FlatFindScreen = () => {
  const {data: adverts, error, isLoading} = useGetAdvertsQuery();

  const [openModal, setOpenModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortedFlats, setSortedFlats] = useState([]);
  const [search, setSearch] = useState<string>('');
  const [screen, setScreen] = useState('list');

  const setActiveScreen = (activeScreen: string) => {
    setScreen(activeScreen);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message="There was an error getting flats" />;
  }

  return (
    <SafeAreaView style={CoreStyleSheet.SafeViewContainer}>
      <View style={styles.searchContainer}>
        <InputFieldText
          type="search"
          onChangeText={t => setSearch(t)}
          value={search}
          placeholder="City, Neighbourhood..."
          onClear={() => setSearch('')}
          keyboardType="email-address"
          style={styles.inputField}
        />
        <FilterButton onPress={() => setOpenModal(true)} />
      </View>
      <HeaderPageContentSwitch
        toggleNames={['List View', 'Map View']}
        toggleIcons={['list', 'map']}
        markers={['list', 'map']}
        activeScreen={screen}
        setActiveScreen={setActiveScreen}
      />
      {screen === 'list' ? (
        <View style={CoreStyleSheet.screenContainer}>
          <FlatListSubScreen adverts={adverts ?? []} />
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <AdvertMap adverts={adverts ?? []} />
        </View>
      )}
      <SearchFilterModal openModal={openModal} setOpenModal={setOpenModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  inputField: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: size(20),
  },
});

export default FlatFindScreen;
