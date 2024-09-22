import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
//Redux
import {useAppSelector} from 'reduxCore/hooks';
import {useGetApplicationByIdQuery} from 'reduxFeatures/applications/applicationApi';
import {
  useGetAdvertByIdQuery,
  useToggleFavoriteMutation,
} from 'reduxFeatures/adverts/advertApi';
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
  const currentUser = useAppSelector(state => state.user.user);
  const isLessor = currentUser.userType === 'lessor';
  console.log('isLessor', isLessor);
  console.log('id', id);

  useEffect(() => {
    console.log('this component rendered ');
  }, []);

  const {
    data: application,
    isLoading: applicationIsLoading,
    error: applicationError,
  } = useGetApplicationByIdQuery(id, {skip: isLessor});
  const {
    data: _advert,
    error: advertError,
    isLoading: advertIsLoading,
  } = useGetAdvertByIdQuery(id, {skip: !isLessor});

  const [toggleFavorite] = useToggleFavoriteMutation();

  const advert = isLessor ? _advert : application?.advert;
  console.log('_advert', _advert);
  console.log('application', application);

  const [collapsed, setCollapsed] = useState(false);
  const toggleExpand = () => {
    setCollapsed(prev => !prev);
  };
  console.log('advertId', advert?.id);
  console.log('applicationId', application?.id);
  const handleFavorite = async () => {
    try {
      await toggleFavorite((advert?.id || application?.advert.id) ?? 0); // Use the correct ID based on the user type
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  if (applicationIsLoading || advertIsLoading) {
    return (
      <View style={styles.pageContainer}>
        <SafeAreaView
          style={[styles.pageContainer, styles.loadingErrorContainer]}>
          <Text style={fontStyles.headerSmall}>Loading...</Text>
        </SafeAreaView>
      </View>
    );
  }

  if (applicationError || advertError) {
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <HighlightButtons
          heartPresent={!advert?.lessor}
          // color={advert?.lessor ? Color.Lavendar[100] : Color.Mint[100]}
          onPressHeart={handleFavorite}
        />
        <View>
          <LofftHeaderPhoto
            imageContainerHeight={300}
            images={advert?.flat.photos ?? []}
          />
          <View style={styles.maincontainer}>
            <StatusBarComponent
              application={application}
              _advert={advert}
              isLessor={isLessor}
            />
          </View>
        </View>
        <SafeAreaView>
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
        </SafeAreaView>
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
    width: '100%',
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
