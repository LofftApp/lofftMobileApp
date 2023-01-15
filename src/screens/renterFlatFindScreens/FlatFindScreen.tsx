import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// Firebase 🔥
import auth from '@react-native-firebase/auth';

// Screens 📺
import PrimaryScreen from '@Components/coreComponents/ScreenTemplates/PrimaryScreen';
import FlatListSubScreen from './SubScreens/FlatListSubScreen';

// Components 🪢
import FilterButton from '@Components/buttons/FilterButton';
import InputFieldText from '@Components/coreComponents/inputField/InputFieldText';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import FlatMap from '@Components/Maps/FlatMap';
import FlatListCard from '@Components/cards/ListViewFlatCard';

// StyleSheets 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

// This list page has old icons, it will need to have new icons when added.

const FlatListScreen = ({navigation}: any) => {
  const [flats,setFlats] = useState([
    {
      address: 'Suarezstr 20, Berlin',
      matchP: 64,
      price: 600,
      district: 'Mitte',
      id: 1,
    },
    {
      address: 'Rudi Duschke Str 2, Berlin',
      matchP: 82,
      price: 920,
      district: 'Xberg',
      id: 2,
    },
    {
      address: 'Schlegelstr 14, Berlin',
      matchP: 91,
      price: 950,
      district: 'Xberg',
      id: 3,
    },

    {
      address: 'Wilsnackerstr 13, Berlin',
      matchP: 78,
      price: 400,
      district: 'Moabit',
      id: 4,
    },
  ]);

  useEffect(() => {
    const reOrder = flats.sort((a,b) => b.matchP - a.matchP)

    setFlats(reOrder);

  },[flats])


  const [search, setSearch] = useState('');
  const [screen, setScreen] = useState('list');
  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
        <FilterButton onPress={() => auth().signOut()} />
      </View>
      <View style={styles.viewToggle}>
        <Pressable
          style={[
            styles.toggleButton,
            screen === 'list' ? styles.toggleButtonActive : null,
          ]}
          onPress={() => setScreen('list')}>
          <LofftIcon
            name="list"
            size={20}
            color={screen === 'list' ? Color.Lavendar[100] : Color.Black[50]}
          />
          <Text
            style={[
              fontStyles.bodyMedium,
              styles.toggleButtonText,
              screen === 'list' ? styles.toggleButtonTextActive : null,
            ]}>
            List View
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.toggleButton,
            screen === 'map' ? styles.toggleButtonActive : null,
          ]}
          onPress={() => setScreen('map')}>
          <LofftIcon
            name="map"
            size={20}
            color={screen === 'map' ? Color.Lavendar[100] : Color.Black[50]}
          />
          <Text
            style={[
              fontStyles.bodyMedium,
              styles.toggleButtonText,
              screen === 'map' ? styles.toggleButtonTextActive : null,
            ]}>
            Map View
          </Text>
        </Pressable>
      </View>
      <View style={styles.viewContainer}>
        {screen === 'list' ? <FlatListSubScreen flats={flats} navigation={navigation} /> : <FlatMap flats={flats} />}
      </View>
    </View>
    // </TouchableWithoutFeedback>
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
    marginHorizontal: 25,
    marginTop: 68, // Needs to be added to core view file, though not working when built
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
    paddingTop: 18,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  toggleButtonActive: {
    borderColor: Color.Lavendar[100],
  },
  toggleButtonText: {
    marginLeft: 5,
  },
  toggleButtonTextActive: {
    color: Color.Lavendar[100],
  },
});

export default FlatListScreen;
