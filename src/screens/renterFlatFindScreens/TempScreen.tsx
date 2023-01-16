import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';

import Color from '@StyleSheets/lofftColorPallet.json';

// Components
import HighlightedButtons from '@Components/containers/HighlithgtedButtons';
import PaginationBar from '@Components/bars/PaginationBar';
import LofftHeaderPhoto from '@Components/cards/LofftHeaderPhoto';

// sample Images
import flatOneB from '@Assets/images/2.png';
import flatOneC from '@Assets/images/3.png';
import flatOneD from '@Assets/images/4.png';
import flatOneE from '@Assets/images/5.png';

const TempScreen = ({navigation}) => {
  const [images, setImages] = useState([
    flatOneB,
    flatOneD,
    flatOneC,
    flatOneE,
  ]);



  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    const index = viewableItems[0].index;
    setCurrentCardIndex(index);

  }, []);

  return (
    <View style={styles.pageContainer}>
      <HighlightedButtons navigation={navigation} />
      <LofftHeaderPhoto imageContainerHeight={300}/>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  imageContainer: {
    height: 300,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default TempScreen;
