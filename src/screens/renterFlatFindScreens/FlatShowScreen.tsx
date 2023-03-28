import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Color from '@StyleSheets/lofftColorPallet.json';
import IconButton from '@Components/buttons/IconButton';
import LofftIcon from '@Components/lofftIcons/LofftIcon';


// Redux 🏗️
import {useSelector} from 'react-redux';

// Components
import HighlightedButtons from '@Components/containers/HighlithgtedButtons';
import PaginationBar from '@Components/bars/PaginationBar';
import LofftHeaderPhoto from '@Components/cards/LofftHeaderPhoto';
import {fontStyles} from '@StyleSheets/fontStyles';
import {CoreButton} from '@Components/buttons/CoreButton';
import Chips from '@Components/buttons/Chips';
import FlatInfoContainer from '@Components/containers/FlatInfoContainer';

// Styles

const FlatShowScreen = ({route, navigation, i}: any) => {
  const [flatIndex] = useState(route.params.i);
  const flat = useSelector((state: any) => state.flats.allFlats[flatIndex]);

  const [description, setDescription] = useState(flat.description);

  /* Params are being passed classicly via the route helper instead of  */
  const {price, match} = route.params;

  const [descriptionExpanded, setDescriptionExpansion] = useState(false);

  const expander = () => {
    setDescriptionExpansion(!descriptionExpanded);
  };

  const [matches, setMatches] = useState([
    '🚉',
    '🏳️‍🌈',
    '🎉',
    '👩🏽‍🍳',
    '🥦',
    '🗺',
    '🚭',
    '🌱',
  ]);

  return (
    <View style={styles.pageContainer}>
      {/* Added flatindex to ID, please confirm what is needed there @AdamTomczyk or @DonJuanKim */}
      <HighlightedButtons navigation={navigation} id={flatIndex} />
      <LofftHeaderPhoto imageContainerHeight={300} images={flat.images} />
      <SafeAreaView  style={{backgroundColor: Color.White[100], alignItems: 'center'}}>
        <ScrollView showsVerticalScrollIndicator={false}  style={styles.scrollView}>
          <FlatInfoContainer address={flat.address} description={flat.description} untilDate={flat.untilDate} fromDate={flat.fromDate} flatId={flat.flatId} price={flat.price} district={flat.district} navigation={navigation} button={true}  />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '65%',
    paddingBottom: 10,
    width: '90%',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: Color.White[100]
  },
  imageContainer: {
    height: 300,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  centralizerContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchContainer: {
    width: '90%',
    backgroundColor: Color.Mint[10],
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  infoContainer: {
    width: '90%',
    marginTop: 15,
  },
  LegendContainer: {
    width: '90%',
    marginTop: 10,
  },
  firstRowLegendContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  secondRowLegendContainer: {
    flexDirection: 'row',
  },

  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
});

export default FlatShowScreen;
