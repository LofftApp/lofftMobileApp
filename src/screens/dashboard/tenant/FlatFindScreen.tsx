import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

// Redux 🏪
import {useGetAdvertsQuery} from 'reduxFeatures/adverts/advertApi';

// Helper 🥷🏻
import {size} from 'react-native-responsive-sizes';

// Screens 📺
import FlatListSubScreen from './SubScreens/FlatListSubScreen';

// Components 🪢
import FilterButton from 'components/buttons/FilterButton';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import AdvertMap from 'components/Maps/AdvertMap';
import HeaderPageContentSwitch from 'components/buttons/HeaderPageContentSwitch';
import SearchFilterModal from 'components/modals/SearchFilterModal';

// StyleSheets 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Types 🏷️
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';
import {GetAdvertsParams} from 'reduxFeatures/adverts/types';

const FlatFindScreen = () => {
  const [searchTerm, setSearchTerm] = useState<GetAdvertsParams>(undefined);

  const {
    data: assets,
    isLoading: isLoadingAssets,
    isError: isErrorAssets,
  } = useGetAssetsQuery();
  const features = assets?.features;

  const {data, isLoading, isError, isSuccess} = useGetAdvertsQuery(searchTerm, {
    refetchOnMountOrArgChange: true,
  });
  const adverts = data?.adverts;

  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState<string>('');
  const [screen, setScreen] = useState('list');

  const setActiveScreen = (activeScreen: string) => {
    setScreen(activeScreen);
  };
  const toggleModal = () => {
    setOpenModal(prev => !prev);
  };



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
        <FilterButton onPress={toggleModal} isSearching={!!searchTerm} />
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
          <FlatListSubScreen
            adverts={adverts ?? []}
            isError={isError}
            isLoading={isLoading}
            toggleModal={toggleModal}
          />
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <AdvertMap adverts={adverts ?? []} />
        </View>
      )}
      <SearchFilterModal
        openModal={openModal}
        toggleModal={toggleModal}
        setSearchTerm={setSearchTerm}
        initialFeatures={features ?? []}
        isSuccess={isSuccess}
        isError={isError || isErrorAssets}
        isLoading={isLoading || isLoadingAssets}
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
