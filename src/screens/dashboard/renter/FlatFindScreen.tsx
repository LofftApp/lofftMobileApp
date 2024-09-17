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
import {fontStyles} from 'styleSheets/fontStyles';

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
      <SafeAreaView
        style={[styles.pageContainer, styles.loadingErrorContainer]}>
        <Text style={fontStyles.headerSmall}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    console.error('Error:', error);
    return (
      <SafeAreaView
        style={[styles.pageContainer, styles.loadingErrorContainer]}>
        <Text style={fontStyles.headerSmall}>
          {'There was an error getting advert'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <SafeAreaView style={styles.searchContainer}>
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
      </SafeAreaView>
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
    flexDirection: 'row',
    marginHorizontal: size(20),
  },
  loadingErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FlatFindScreen;
