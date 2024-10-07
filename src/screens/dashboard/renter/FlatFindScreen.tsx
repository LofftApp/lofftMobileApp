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
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

// StyleSheets 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Types 🏷️
type SearchTermType = {
  features?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
};

const FlatFindScreen = () => {
  const [searchTerm, setSearchTerm] = useState<SearchTermType | undefined>(
    undefined,
  );

  const {data, isLoading, error, isSuccess} = useGetAdvertsQuery(searchTerm, {
    refetchOnMountOrArgChange: true,
  });
  const adverts = data?.adverts;

  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState<string>('');
  const [screen, setScreen] = useState('list');

  const setActiveScreen = (activeScreen: string) => {
    setScreen(activeScreen);
  };


  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <NotFoundComponent
        backButton
        message="There was an error getting flats"
      />
    );
  }

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewListContainer}>
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
      <SearchFilterModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        isSuccess={isSuccess}
        setSearchTerm={setSearchTerm}
        initialFeatures={data?.allFlatFeaturesFromDb ?? []}

      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputField: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: size(20),
  },
  flatListContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: size(16),
  },
  mapContainer: {
    flex: 1,
  },
});

export default FlatFindScreen;
