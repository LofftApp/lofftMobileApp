import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

// External
import Collapsible from 'react-native-collapsible';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Components
import HighlightButtons from 'components/containers/HighlightButtons';
import FlatInfoContainer from 'components/containers/FlatInfoContainer';
import StatusBar from 'components/statusbar/StatusBarComponent';
import LofftHeaderPhoto from 'components/cards/LofftHeaderPhoto';

// Helpers
import {size} from 'react-native-responsive-sizes';

// Types
import type {ApplicationShowScreenProp} from './types';
import {useAppSelector} from 'reduxCore/hooks';

const ApplicationShowScreen = ({route}: ApplicationShowScreenProp) => {
  const {advertId} = route.params;

  const advert = useAppSelector(state =>
    state.adverts.adverts.find(item => item.id === advertId),
  );

  const [hasCollapsed, setHasCollapsed] = useState(true);

  return (
    <View style={styles.pageWrapper}>
      <HighlightButtons
        heartPresent={!advert?.lessor}
        color={advert?.lessor ? Color.Lavendar[100] : Color.Mint[100]}
      />
      <LofftHeaderPhoto
        imageContainerHeight={300}
        images={advert?.flat?.photos ?? []}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={[styles.maincontainer]}>
          {advert && <StatusBar advert={advert} />}
          <Text
            onPress={() => setHasCollapsed(!hasCollapsed)}
            style={[fontStyles.bodyMedium, styles.seeMoreLessButton]}>
            {hasCollapsed ? 'see more' : 'see less'}
          </Text>

          <Collapsible collapsed={hasCollapsed} duration={300}>
            {advert && <FlatInfoContainer advert={advert} button={false} />}
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
