import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';

// Fireabse & API 🧠
import {getSavedAndAppliedFlats} from '@Api/firebase/firestoreActions';

// Components 🪢
import PrimaryScreen from '@Components/coreComponents/ScreenTemplates/PrimaryScreen';
import HeaderPageContentSwitch from '@Components/buttons/HeaderPageContentSwitch';
import ListViewFlatCard from '@Components/cards/ListViewFlatCard';

// Stylesheets 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';

const FavoriteFlatScreen = ({navigation}: any) => {
  const [screen, setScreen] = useState('apply');
  const [flats, setFlats] = useState([]);
  useEffect(() => {
    const queryFlats = async () => {
      const query = await getSavedAndAppliedFlats();
      setFlats(query);
    };
    queryFlats();
  }, []);

  const setActiveScreen = (screen: string) => {
    setScreen(screen);
  };
  return (
    <PrimaryScreen>
      <Text style={fontStyles.headerLarge}>Saved listings</Text>
      <HeaderPageContentSwitch
        toggleNames={['To Apply', 'Applied']}
        toggleIcons={['alarm-clock', 'file-check']}
        markers={['apply', 'applied']}
        setActiveScreen={(screen: string) => setActiveScreen(screen)}
        activeScreen={screen}
      />
      <ScrollView
        style={styles.pageContainer}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          {flats.length > 0 ? (
            flats.map((el: any, index: number) => {
              return (
                <ListViewFlatCard
                  navigation={navigation}
                  key={index + 1}
                  match={el?.matchP}
                  flatId={el.flatId}
                  district={el.district}
                  price={el.price}
                  images={el.images}
                />
              );
            })
          ) : (
            <Text>You current don't have any saved flats</Text>
          )}
        </SafeAreaView>
      </ScrollView>
    </PrimaryScreen>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 16,
  },
});

export default FavoriteFlatScreen;
