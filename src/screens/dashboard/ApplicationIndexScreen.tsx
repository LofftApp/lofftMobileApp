import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Firebase 🔥
import auth from '@react-native-firebase/auth';
import {getFlatsFromDB} from '@Api/firebase/firestoreActions';

// Screens 📺
import FlatListSubScreen from './SubScreens/FlatListSubScreen';
import FlatListApplicationsScreen from './SubScreens/FlatListApplicationsScreen';

// Components 🪢
import FilterButton from '@Components/buttons/FilterButton';
import InputFieldText from '@Components/coreComponents/inputField/InputFieldText';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import FlatMap from '@Components/Maps/FlatMap';
import HeaderPageContentSwitch from '@Components/buttons/HeaderPageContentSwitch';

// StyleSheets 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

const ApplicationIndexScreen = ({navigation}: any) => {
  const [sortedFlats, setSortedFlats] = useState([]);

  useEffect(() => {
    const getFlats = async () => {
      const flats = await getFlatsFromDB();
      if (flats) {
        if (flats[0]?.matchP) {
          const reOrder = flats.sort((a: any, b: any) => b.matchP - a.matchP);
          setSortedFlats(reOrder);
        } else {
          setSortedFlats(flats);
        }
      }
    };
    getFlats();
  }, []);

  const [search, setSearch] = useState('');
  const [screen, setScreen] = useState('thumbs-up');

  const setActiveScreen = (screen: string) => {
    setScreen(screen);
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerText}>
        <Text style={fontStyles.headerLarge}>My Applications</Text>
      </View>
      <HeaderPageContentSwitch
        toggleNames={['Active', 'Inactive']}
        toggleIcons={['thumbs-up', 'thumbs-down']}
        markers={['thumbs-up', 'thumbs-down']}
        activeScreen={screen}
        setActiveScreen={(screen: string) => setActiveScreen(screen)}
      />
      <View style={styles.viewContainer}>
        {screen === 'thumbs-up' ? (
          <FlatListApplicationsScreen
            flats={sortedFlats}
            navigation={navigation}
            active={true}
          />
        ) : (
          <FlatListApplicationsScreen
            flats={sortedFlats}
            navigation={navigation}
            /* Just for demo purposes 🚨 🚨 */
            active={false}
          />
        )}
      </View>
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
  headerText: {
    marginTop: 50,
    marginHorizontal: 16,
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

export default ApplicationIndexScreen;