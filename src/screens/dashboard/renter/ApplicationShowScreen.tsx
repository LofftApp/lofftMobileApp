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
import StatusBar from '@Components/statusbar/StatusBar';
import LofftHeaderPhoto from '@Components/cards/LofftHeaderPhoto';

// Assets 🪴
import LofftIcon from '@Components/lofftIcons/LofftIcon';

const ApplicationShowScreen = ({navigation, route}: any) => {
  const [advert, userType] = [route.params.advert, route.params.userType];

  const [hascollaped, setHasCollapsed] = useState(true);
  const screenheight = Dimensions.get('window').height;
  const [screen] = useState(1);
  const [save, setSave] = useState(false);
  const [activeStatus, setActiveStatus] = useState([
    {
      header: 'Applied',
      subText:
        'The landlord has up to 48 hrs after the ad has expired to review your application',
      icon: 'file- check',
    },
    {
      header: 'Opened',
      subText:
        'Landlord has opened your application. You’ll know the first-round decision in 48 hrs',
      icon: 'eye',
    },
    {
      header: 'In Review',
      subText:
        'You’ll be notified if you’ve made it to the shortlist in 48 hrs ',
      icon: 'user-check',
    },
    {
      header: 'Schedule flat viewing',
      subText: 'You can now message the landlord and organise a flat viewing',
      icon: 'calendar',
    },
    {
      header: 'Offer!',
      subText: 'Congratulations, you made it!',
      icon: 'rocket',
    },
  ]);

  const [icons, setIcons] = useState([
    'file-check',
    'eye',
    'user-check',
    'calendar',
    'rocket',
  ]);

  const calculateStatusBar = (currentStatusIndex: any) => {
    let status = null;

    switch (currentStatusIndex) {
      case 'active':
        status = '40';
        break;
      case 'closed':
        status = '60';
        break;
      case 'offered':
        status = '80';
        break;
      case 'deleted':
        status = '100';
        break;
      default:
        status = '20';
        break;
    }
    // setStatusBar(status);
  };

  useEffect(() => {
    calculateStatusBar(advert.status);
  });

  return (
    <View style={styles.pageWrapper}>
      <HighlightedButtons
        navigation={navigation}
        heartPresent={false}
        color={userType === 'lessor' ? Color.Lavendar[100] : Color.Mint[100]}
      />
      <LofftHeaderPhoto
        imageContainerHeight={300}
        images={advert.flat.photos}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={[styles.maincontainer]}>
          <StatusBar
            landlord={userType === 'lessor'}
            currentApplicationStatus={advert.status}
          />
          <Text
            onPress={() => setHasCollapsed(!hascollaped)}
            style={[
              fontStyles.headerLarge,
              {textAlign: 'right', color: Color.Black[100]},
            ]}>
            {hascollaped ? '+' : '-'}
          </Text>

          <Collapsible collapsed={hascollaped} duration={300}>
            <FlatInfoContainer
              navigation={navigation}
              advert={advert}
              button={false}
            />
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
