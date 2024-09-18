import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
//Redux
import {useGetApplicationByIdQuery} from 'reduxFeatures/applications/applicationApi';

// External
import Collapsible from 'react-native-collapsible';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Components
import HighlightButtons from 'components/containers/HighlightButtons';
import FlatInfoSubScreen from './SubScreens/FlatInfoSubScreen';
import LofftHeaderPhoto from 'components/cards/LofftHeaderPhoto';
import StatusBarComponent from 'components/statusbar/StatusBarComponent';

// Helpers
import {size} from 'react-native-responsive-sizes';

// Types
import type {ApplicationShowScreenProp} from './types';

const ApplicationShowScreen = ({route}: ApplicationShowScreenProp) => {
  const {id} = route.params;

  const {data: application, isLoading, error} = useGetApplicationByIdQuery(id);
  console.log(application);
  const advert = application?.advert;

  const [collapsed, setCollapsed] = useState(false);
  const toggleExpand = () => {
    setCollapsed(prev => !prev);
  };
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
        <View style={styles.maincontainer}>
          {application && <StatusBarComponent application={application} />}

          <View style={styles.seeMoreContainer}>
            <Text
              onPress={toggleExpand}
              style={[fontStyles.bodySmall, styles.seeMore]}>
              {collapsed ? 'See less' : 'See more'}
            </Text>
            {collapsed ? (
              <>
                <LofftIcon
                  name="chevron-up"
                  size={25}
                  color={Color.Blue[100]}
                />
              </>
            ) : (
              <>
                <LofftIcon
                  name="chevron-down"
                  size={25}
                  color={Color.Blue[100]}
                />
              </>
            )}
          </View>

          <Collapsible collapsed={!collapsed} duration={300}>
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
    alignContent: 'center',
  },
  seeMore: {
    color: Color.Blue[100],
    alignSelf: 'flex-end',
    marginHorizontal: size(10),
    marginBottom: size(2),
  },
  loadingErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: size(10),
    paddingBottom: size(10),
  },
});

export default ApplicationShowScreen;
