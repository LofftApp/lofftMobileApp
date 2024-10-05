import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
//Redux
import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {
  applicationApi,
  useGetApplicationByIdQuery,
} from 'reduxFeatures/applications/applicationApi';
import {
  useGetAdvertByIdQuery,
  useToggleFavoriteMutation,
} from 'reduxFeatures/adverts/advertApi';

// External
import Collapsible from 'react-native-collapsible';

// Components
import HighlightButtons from 'components/containers/HighlightButtons';
import FlatInfoSubScreen from './SubScreens/FlatInfoSubScreen';
import LofftHeaderPhoto from 'components/cards/LofftHeaderPhoto';
import StatusBarComponent from 'components/statusbar/StatusBarComponent';
import LoadingComponent from 'components/LoadingAndError/LoadingComponent';
import ErrorComponent from 'components/LoadingAndError/ErrorComponent';

// Types
import type {ApplicationShowScreenProp} from './types';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import SeeMoreButton from 'components/buttons/SeeMoreButton';

const ApplicationShowScreen = ({route}: ApplicationShowScreenProp) => {
  const {id} = route.params;
  const currentUser = useAppSelector(state => state.user.user);
  const isLessor = currentUser.userType === 'lessor';

  //Renter Journey
  const {
    data: application,
    isLoading: applicationIsLoading,
    error: applicationError,
  } = useGetApplicationByIdQuery(id, {skip: isLessor});
  console.log('application in show', application);

  //Lessor Journey
  const {
    data: _advert,
    error: advertError,
    isLoading: advertIsLoading,
  } = useGetAdvertByIdQuery(id, {skip: !isLessor});

  const [toggleFavorite] = useToggleFavoriteMutation();
  const dispatch = useAppDispatch();

  const advert = isLessor ? _advert : application?.advert;
  console.log('advert in show', advert);

  const [collapsed, setCollapsed] = useState(false);
  const toggleExpand = () => {
    setCollapsed(prev => !prev);
  };

  const handleFavorite = async () => {
    try {
      await toggleFavorite(advert?.id ?? 0);
      dispatch(
        applicationApi.util.invalidateTags([{type: 'Applications', id}]),
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (applicationIsLoading || advertIsLoading) {
    return <LoadingComponent />;
  }

  if (applicationError || advertError) {
    return (
      <ErrorComponent message="There was an error getting the application" />
    );
  }
  return (
    <View style={CoreStyleSheet.showContainer}>
      <View>
        <HighlightButtons
          favorite={advert?.favorite}
          heartPresent={!advert?.lessor}
          onPressHeart={handleFavorite}
        />

        <LofftHeaderPhoto
          imageContainerHeight={300}
          images={advert?.flat.photos ?? []}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={CoreStyleSheet.screenContainer}>
          <StatusBarComponent
            application={application}
            _advert={advert}
            isLessor={isLessor}
          />

          <SeeMoreButton collapsed={collapsed} toggleExpand={toggleExpand} />

          <Collapsible collapsed={!collapsed} duration={300}>
            {advert && <FlatInfoSubScreen advert={advert} />}
          </Collapsible>
        </View>
      </ScrollView>
    </View>
  );
};

export default ApplicationShowScreen;
