import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

// External
import Collapsible from 'react-native-collapsible';

// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Components
import HighlightedButtons from '@Components/containers/HighlightButtons';
import FlatInfoContainer from '@Components/containers/FlatInfoContainer';
import {CoreButton} from '@Components/buttons/CoreButton';
import StatusBar from '@Components/statusbar/StatusBarComponent';
import LofftHeaderPhoto from '@Components/cards/LofftHeaderPhoto';

// Assets 🪴
import LofftIcon from '@Components/lofftIcons/LofftIcon';

const ApplicationShowScreen = ({navigation, route}: any) => {
  const {advert, isLessor} = route.params;

  const [hascollaped, setHasCollapsed] = useState(true);
  const screenheight = Dimensions.get('window').height;
  const [screen] = useState(1);
  const [save, setSave] = useState(false);

  const [icons, setIcons] = useState([
    'file-check',
    'eye',
    'user-check',
    'calendar',
    'rocket',
  ]);

  const [currentFlatStatusIndex] = useState(advert.status);
  const [currentStatusBar, setStatusBar] = useState('');

  const calculateStatusBar = currentStatusIndex => {
    let status = null;

    switch (currentStatusIndex) {
      case 1:
        status = '40';
        break;
      case 2:
        status = '60';
        break;
      case 3:
        status = '80';
        break;
      case 4:
        status = '100';
        break;
      default:
        status = '20';
        break;
    }
    setStatusBar(status);
  };

  useEffect(() => {
    calculateStatusBar(currentFlatStatusIndex);
  });

  return (
    <View style={styles.pageWrapper}>
      <HighlightedButtons
        navigation={navigation}
        id={advert.flat.id}
        heartPresent={false}
        color={isLessor ? Color.Lavendar[100] : Color.Mint[100]}
      />
      <LofftHeaderPhoto
        imageContainerHeight={300}
        images={advert.flat.photos}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={[styles.maincontainer]}>
          <StatusBar advert={advert} currentApplicationStatus={advert.status} />
          <Text
            onPress={() => setHasCollapsed(!hascollaped)}
            style={[
              fontStyles.headerLarge,
              {textAlign: 'right', color: Color.Black[100]},
            ]}>
            {hascollaped ? '+' : '-'}
          </Text>

          <Collapsible collapsed={hascollaped} duration={300}>
            <FlatInfoContainer advert={advert} button={false} navigation />
          </Collapsible>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  scrollView: {
    backgroundColor: Color.White[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  maincontainer: {
    width: '90%',
    paddingTop: 30,
    paddingBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    maxHeight: '40%',
    /* 🤖 This one effects the layout of the progress bar look and text */
    justifyContent: 'space-between',
  },
  progressBarOutline: {
    backgroundColor: Color.Mint[10],
    height: '100%',
    width: '15%',
    borderRadius: 28,
    alignItems: 'center',
  },
  iconsPosition: {
    position: 'absolute',
    zIndex: 400,
    height: '100%',
    justifyContent: 'space-around',
  },
  progressBar: {
    width: '100%',
    backgroundColor: Color.Mint[100],
    borderRadius: 30,
  },
  progressTextContainer: {
    height: '98%', // '98%'
    width: '90%',
    justifyContent: 'space-around',
  },
});

export default ApplicationShowScreen;
