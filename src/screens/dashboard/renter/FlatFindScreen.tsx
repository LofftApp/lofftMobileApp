import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

// Redux 🏪
import {useAppDispatch, useAppSelector} from '@ReduxCore/hooks';
import {fetchAdverts} from '@Redux/adverts/advertMiddleware';

// Screens 📺
import FlatListSubScreen from '../renter/SubScreens/FlatListSubScreen';

// Components 🪢
import FilterButton from '@Components/buttons/FilterButton';
import InputFieldText from '@Components/coreComponents/inputField/InputFieldText';
import FlatMap from '@Components/Maps/AdvertMap';
import HeaderPageContentSwitch from '@Components/buttons/HeaderPageContentSwitch';
import SearchFilterModal from '@Components/modals/SearchFilterModal';

// StyleSheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

const FlatListScreen = ({navigation}: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [sortedFlats, setSortedFlats] = useState([]);
  const pullData = (data: any) => {
    setOpenModal(data);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdverts());
  }, []);

  const adverts = useAppSelector((state: any) => state?.adverts?.adverts);

  const [search, setSearch] = useState('');
  const [screen, setScreen] = useState('list');

  const setActiveScreen = (screen: string) => {
    setScreen(screen);
  };

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
        <FilterButton onPress={() => pullData(true)} />
      </View>
      <HeaderPageContentSwitch
        toggleNames={['List View', 'Map View']}
        toggleIcons={['list', 'map']}
        markers={['list', 'map']}
        activeScreen={screen}
        setActiveScreen={(screen: string) => setActiveScreen(screen)}
      />
      <View style={styles.viewContainer}>
        {screen === 'list' ? (
          <FlatListSubScreen navigation={navigation} adverts={adverts} />
        ) : (
          <FlatMap />
        )}
      </View>
      <SearchFilterModal openModal={openModal} pullData={pullData} />
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginTop: 68, // Needs to be added to core view file, though not working when built
  },
});

export default FlatListScreen;
