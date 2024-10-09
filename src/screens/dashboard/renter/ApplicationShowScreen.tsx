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
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import SeeMoreButton from 'components/buttons/SeeMoreButton';

// Types
import type {ApplicationShowScreenProp} from './types';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

const ApplicationShowScreen = ({route}: ApplicationShowScreenProp) => {
  const {id} = route.params;

  const {data} = useGetUserQuery();
  const isLessor = data?.user?.userType === 'lessor';

  //Renter Journey
  const {
    data: application,
    isLoading: applicationIsLoading,
    error: applicationError,
  } = useGetApplicationByIdQuery(id, {skip: isLessor});

  //Lessor Journey
  const {
    data: _advert,
    error: advertError,
    isLoading: advertIsLoading,
  } = useGetAdvertByIdQuery(id, {skip: !isLessor});

  const [toggleFavorite] = useToggleFavoriteMutation();
  const dispatch = useAppDispatch();

  const advert = isLessor ? _advert : application?.advert;

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
      <NotFoundComponent
        backButton
        message="There was an error getting the application"
      />
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
