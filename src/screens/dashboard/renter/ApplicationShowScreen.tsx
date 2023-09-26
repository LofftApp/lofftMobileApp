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
  const {advert} = route.params;
  const [hascollaped, setHasCollapsed] = useState(true);

  return (
    <View style={styles.pageWrapper}>
      <HighlightedButtons
        navigation={navigation}
        id={advert.flat.id}
        heartPresent={!advert.lessor}
        color={advert.lessor ? Color.Lavendar[100] : Color.Mint[100]}
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
            style={[fontStyles.bodyMedium, styles.seeMoreLessButton]}>
            {hascollaped ? 'see more' : 'see less'}
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
    width: '100%',
  },
  seeMoreLessButton: {
    color: Color.Blue[100],
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
});

export default ApplicationShowScreen;
