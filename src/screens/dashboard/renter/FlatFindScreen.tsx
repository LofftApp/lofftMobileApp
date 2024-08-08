import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

// Redux 🏪
import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {fetchAdverts} from 'reduxFeatures/adverts/advertMiddleware';
import { activateFilter } from 'reduxFeatures/adverts/advertSlice.ts';

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



const FlatFindScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortedFlats, setSortedFlats] = useState([]);
  const [search, setSearch] = useState('');
  const [screen, setScreen] = useState('list');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);

  const setActiveScreen = (activeScreen: string) => {
    setScreen(activeScreen);
  };

  const activateSearchModal = () => {
    setOpenModal(true)
    dispatch(activateFilter())
  }


  return (
    <View style={styles.pageContainer}>
      <View style={styles.searchContainer}>
        <InputFieldText
          type="search"
          onChangeText={(t: string) => setSearch(t)}
          value={search}
          placeholder="City, Neighbourhood..."
          onClear={() => setSearch('')}
          keyboardType="email-address"
          style={styles.inputField}
        />
        <FilterButton onPress={() => activateSearchModal()} />
      </View>
      <HeaderPageContentSwitch
        toggleNames={['List View', 'Map View']}
        toggleIcons={['list', 'map']}
        markers={['list', 'map']}
        activeScreen={screen}
        setActiveScreen={setActiveScreen}
      />
      <View style={styles.viewContainer}>
        {screen === 'list' ? <FlatListSubScreen /> : <AdvertMap />}
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
});

export default FlatFindScreen;
