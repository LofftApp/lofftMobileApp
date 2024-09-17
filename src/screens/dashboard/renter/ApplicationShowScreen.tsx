import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

// External
import Collapsible from 'react-native-collapsible';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Components
import HighlightButtons from 'components/containers/HighlightButtons';
import FlatInfoSubScreen from './SubScreens/FlatInfoSubScreen';
import StatusBar from 'components/statusbar/StatusBarComponent';
import LofftHeaderPhoto from 'components/cards/LofftHeaderPhoto';

// Helpers
import {size} from 'react-native-responsive-sizes';

// Types
import type {ApplicationShowScreenProp} from './types';
import {useGetApplicationByIdQuery} from 'reduxFeatures/applications/applicationApi';

const ApplicationShowScreen = ({route}: ApplicationShowScreenProp) => {
  const {id} = route.params;

  const {data: application, isLoading, error} = useGetApplicationByIdQuery(id);
  console.log(application);
  const advert = application?.advert;

  const [hasCollapsed, setHasCollapsed] = useState(true);
  if (isLoading) {
    return (
      <View style={styles.pageContainer}>
        <SafeAreaView
          style={[styles.pageContainer, styles.loadingErrorContainer]}>
          <Text style={fontStyles.headerSmall}>Loading...</Text>
        </SafeAreaView>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.pageContainer}>
        <SafeAreaView
          style={[styles.pageContainer, styles.loadingErrorContainer]}>
          <Text style={fontStyles.headerSmall}>
            There was an error getting this application
          </Text>
        </SafeAreaView>
      </View>
    );
  }
  return (
    <View style={styles.pageContainer}>
      <HighlightButtons
        heartPresent={!advert?.lessor}
        color={advert?.lessor ? Color.Lavendar[100] : Color.Mint[100]}
      />
      <LofftHeaderPhoto
        imageContainerHeight={300}
        images={advert?.flat.photos ?? []}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={[styles.maincontainer]}>
          {advert && <StatusBar advert={advert} />}
          <Text
            onPress={() => setHasCollapsed(!hasCollapsed)}
            style={[fontStyles.bodyMedium, styles.seeMoreLessButton]}>
            {hasCollapsed ? 'See more' : 'See less'}
          </Text>

          <Collapsible collapsed={hasCollapsed} duration={300}>
            {advert && <FlatInfoSubScreen advert={advert} />}
          </Collapsible>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
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
  loadingErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ApplicationShowScreen;
