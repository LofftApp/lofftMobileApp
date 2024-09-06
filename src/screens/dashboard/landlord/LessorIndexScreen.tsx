import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Screens 📺
import FlatListComponent from '../renter/SubScreens/FlatListComponent';

// Components 🪢
//import HeaderPageContentSwitch from 'components/buttons/HeaderPageContentSwitch';

// Helpers 🧰
import {size} from 'react-native-responsive-sizes';

// Redux
import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {fetchAdverts} from 'reduxFeatures/adverts/advertMiddleware';

// StyleSheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import * as Color from 'styleSheets/lofftColorPallet.json';

// Assets
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Types
import type {AdvertState} from 'reduxFeatures/adverts/types';

const LessorIndexScreen = ({navigation}: any) => {
  /* To be reviwed
  // const [sortedadverts, setSortedadverts] = useState([]);
  // const oneFlat = sortedadverts.slice(0, 1);
  */
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);

  const adverts = useAppSelector(
    (state: {adverts: AdvertState}) => state.adverts.adverts,
  );

  /*
  // useEffect(() => {
  //   const getadverts = async () => {
  //     const adverts: any = [];
  //     if (adverts) {
  //       if (adverts[0]?.matchP) {
  //         const reOrder = adverts.sort((a: any, b: any) => b.matchP - a.matchP);
  //         setSortedadverts(reOrder);
  //       } else {
  //         setSortedadverts(adverts);
  //       }
  //     }
  //   };
  //   getadverts();
  // }, []);

  const [screen, setScreen] = useState('thumbs-up');

  const setActiveScreen = (screen: string) => {
    setScreen(screen);
  };
  */

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
    marginVertical: size(15),
    position: 'relative',
  },
  inputField: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: size(16),
    flexDirection: 'row',
    marginTop: size(68), // Needs to be added to core view file, though not working when built
  },
  headerText: {
    marginTop: size(70),
    marginHorizontal: size(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    paddingVertical: size(7),
    paddingHorizontal: size(12),
    borderRadius: size(12),
  },
  actionContainer: {
    flexDirection: 'row',
  },
});

export default LessorIndexScreen;
