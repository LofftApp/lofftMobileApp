import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Firebase 🔥
import {getFlatsFromDB} from '@Api/firebase/firestoreActions';

// Screens 📺
import FlatListApplicationsScreen from '../renter/SubScreens/FlatListApplicationsScreen';

// Components 🪢
import HeaderPageContentSwitch from '@Components/buttons/HeaderPageContentSwitch';

// StyleSheets 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

// Assets
import LofftIcon from '@Components/lofftIcons/LofftIcon';

const LessorIndexScreen = ({navigation}: any) => {
  const [sortedFlats, setSortedFlats] = useState([]);
  const oneFlat = sortedFlats.slice(0, 1);


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

  const [screen, setScreen] = useState('thumbs-up');

  const setActiveScreen = (screen: string) => {
    setScreen(screen);
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerText}>
        <Text style={fontStyles.headerLarge}>My Listings</Text>
        <View style={styles.actionContainer}>
        <Pressable style={[styles.addButton, {marginRight: 15,}]}>
            <LofftIcon name={'annotation-heart'} size={33} color={Color.Lavendar[100]} />
        </Pressable>
        <Pressable style={styles.addButton}>
            <LofftIcon name={'plus'} size={33} color={Color.Lavendar[100]} />
        </Pressable>
        </View>
      </View>


      <View style={styles.viewContainer}>
        <FlatListApplicationsScreen
          flats={oneFlat}
          navigation={navigation}
          active={true}
          isLessor={true}
        />
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
    marginVertical: 15,
    position: 'relative',
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
    marginTop: 70,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  actionContainer:{
    flexDirection: 'row',

  }
});

export default LessorIndexScreen;