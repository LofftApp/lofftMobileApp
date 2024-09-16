import React, {useState} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';

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

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Types 🏷️

const FlatFindScreen = () => {
  const {data: adverts, error, isError, isLoading} = useGetAdvertsQuery();

  const [openModal, setOpenModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortedFlats, setSortedFlats] = useState([]);
  const [search, setSearch] = useState<string>('');
  const [screen, setScreen] = useState('list');

  const setActiveScreen = (activeScreen: string) => {
    setScreen(activeScreen);
  };

  if (isLoading) {
    return (
      <View style={styles.pageContainer}>
        <SafeAreaView style={styles.loadingErrorContainer}>
          <Text>Loading...</Text>
        </SafeAreaView>
      </View>
    );
  }

  if (isError) {
    console.error('Error:', error);
    return (
      <View style={styles.pageContainer}>
        <SafeAreaView style={styles.loadingErrorContainer}>
          <Text>{'Error: There was an error getting advert'}</Text>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
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
      <View style={styles.viewContainer}>
        {screen === 'list' ? (
          <FlatListSubScreen adverts={adverts ?? []} />
        ) : (
          <AdvertMap adverts={adverts ?? []} />
        )}
      </View>
      <SearchFilterModal openModal={openModal} setOpenModal={setOpenModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  viewContainer: {
    flex: 1,
  },
  inputField: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: size(16),
    flexDirection: 'row',
    marginTop: size(68), // Needs to be added to core view file, though not working when built
  },
  loadingErrorContainer: {
    backgroundColor: Color.White[100],
    alignItems: 'center',
  },
});

export default FlatFindScreen;
