import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

// External
import Collapsible from 'react-native-collapsible';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Components
import HighlightedButtons from 'components/containers/HighlightButtons';
import FlatInfoContainer from 'components/containers/FlatInfoContainer';
import StatusBar from 'components/statusbar/StatusBarComponent';
import LofftHeaderPhoto from 'components/cards/LofftHeaderPhoto';

// Helpers
import {size} from 'react-native-responsive-sizes';

// Types
import type {ApplicationShowScreenProp} from './types';

const ApplicationShowScreen = ({
  navigation,
  route,
}: ApplicationShowScreenProp) => {
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
        images={advert.flat.photos ?? []}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={[styles.maincontainer]}>
          <StatusBar advert={advert} />
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
    marginRight: size(10),
    marginBottom: size(10),
  },
});

export default ApplicationShowScreen;
