import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Screens 📺
import FlatListComponent from '../renter/SubScreens/FlatListComponent';

// Components 🪢
import HeaderPageContentSwitch from 'components/buttons/HeaderPageContentSwitch';

// Redux
import {useAppDispatch, useAppSelector} from '@ReduxCore/hooks';
import {fetchAdverts} from '@Redux/adverts/advertMiddleware';

// StyleSheets 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import * as Color from '@StyleSheets/lofftColorPallet.json';

// Assets
import LofftIcon from 'components/lofftIcons/LofftIcon';

const LessorIndexScreen = ({navigation}: any) => {
  const [sortedadverts, setSortedadverts] = useState([]);
  const oneFlat = sortedadverts.slice(0, 1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdverts());
    // dispatch(getProfile())
  }, []);

  const adverts = useAppSelector((state: any) => state.adverts.adverts);

  useEffect(() => {
    const getadverts = async () => {
      const adverts: any = [];
      if (adverts) {
        if (adverts[0]?.matchP) {
          const reOrder = adverts.sort((a: any, b: any) => b.matchP - a.matchP);
          setSortedadverts(reOrder);
        } else {
          setSortedadverts(adverts);
        }
      }
    };
    getadverts();
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
          <Pressable style={[styles.addButton, {marginRight: 15}]}>
            <LofftIcon
              name={'annotation-heart'}
              size={33}
              color={Color.Lavendar[100]}
            />
          </Pressable>
          <Pressable style={styles.addButton}>
            <LofftIcon name={'plus'} size={33} color={Color.Lavendar[100]} />
          </Pressable>
        </View>
      </View>

      <View style={styles.viewContainer}>
        <FlatListComponent
          adverts={adverts}
          navigation={navigation}
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
  actionContainer: {
    flexDirection: 'row',
  },
});

export default LessorIndexScreen;
