import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

// Firebase 🔥
import {getFlatsFromDB} from '@Api/firebase/firestoreActions';

// Screens 📺
import FlatListSubScreen from '../renter/SubScreens/FlatListSubScreen';

// Components 🪢
import FilterButton from '@Components/buttons/FilterButton';
import InputFieldText from '@Components/coreComponents/inputField/InputFieldText';
import FlatMap from '@Components/Maps/FlatMap';
import HeaderPageContentSwitch from '@Components/buttons/HeaderPageContentSwitch';
import SearchFilterModal from '@Components/modals/SearchFilterModal';

// Redux 🏪
import {useDispatch} from 'react-redux';
import {setAllFlats} from '@Redux/flat/flatsSlice';

// StyleSheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

const FlatListScreen = ({navigation}: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [sortedFlats, setSortedFlats] = useState([]);

  const pullData = (data: any) => {
    setOpenModal(data);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const getFlats = async () => {
      const flats = await getFlatsFromDB();
      if (flats) {
        if (flats[0]?.matchP) {
          const reOrder = flats.sort((a: any, b: any) => b.matchP - a.matchP);
          dispatch(setAllFlats(reOrder));
          setSortedFlats(reOrder);
        } else {
          setSortedFlats(flats);
          dispatch(setAllFlats(flats));
        }
      }
    };
    getFlats();
  }, []);

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
          <FlatListSubScreen navigation={navigation} />
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
  // flatListSubScreen: {
  //   margin: 10,
  // },
  // viewToggle: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   borderColor: Color.Lavendar[100],
  //   borderWidth: 2,
  //   borderRadius: 12,
  //   marginTop: 8,
  //   height: 40,
  //   marginBottom: 8,
  // },
  // toggleButton: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 10,
  // },
  // toggleButtonActive: {
  //   backgroundColor: Color.Lavendar[100],
  // },
  // toggleButtonText: {
  //   marginLeft: 5,
  //   color: Color.Lavendar[100],
  // },
  // toggleButtonTextActive: {
  //   color: Color.White[100],
  // },
});

export default FlatListScreen;
