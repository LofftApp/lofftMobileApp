import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

// External
import Collapsible from 'react-native-collapsible';

// Redux 🏗️
import {useAppSelector} from '@ReduxCore/hooks';

// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Components
import HighlightedButtons from '@Components/containers/HighlightButtons';
import FlatInfoContainer from '@Components/containers/FlatInfoContainer';
import StatusBar from '@Components/statusbar/StatusBarComponent';
import LofftHeaderPhoto from '@Components/cards/LofftHeaderPhoto';

// Helpers
import {tagSorter} from '@Helpers/tagSorter';

const ApplicationShowScreen = ({navigation, route}: any) => {
  const {advert} = route.params;
  const userProfile = useAppSelector((state: any) => state.user.user);
  const [hascollaped, setHasCollapsed] = useState(true);

  const characteristicsTags = tagSorter(
    userProfile.profile.characteristics,
    advert.flat.characteristics,
  );

  const featuresTags = tagSorter(userProfile.filter, advert.flat.features);

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
          <StatusBar
            advert={advert}
            currentApplicationStatus={advert.status}
            navigation={navigation}
          />
          <Text
            onPress={() => setHasCollapsed(!hascollaped)}
            style={[fontStyles.bodyMedium, styles.seeMoreLessButton]}>
            {hascollaped ? 'see more' : 'see less'}
          </Text>

          <Collapsible collapsed={hascollaped} duration={300}>
            <View style={styles.flatInfoContainerWrapper}>
              <FlatInfoContainer
                advert={advert}
                navigation={navigation}
                button={true}
                chips={{
                  features:
                    featuresTags !== null ? featuresTags : advert.flat.features,
                  characteristics:
                    characteristicsTags !== null
                      ? characteristicsTags
                      : advert.flat.characteristics,
                }}
              />
            </View>
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
  flatInfoContainerWrapper: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
});

export default ApplicationShowScreen;
