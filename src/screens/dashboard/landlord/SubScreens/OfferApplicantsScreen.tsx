import React from 'react';
import {View} from 'react-native';
import {useFinalRoundQuery} from 'reduxFeatures/adverts/advertApi';
import {OfferApplicantsScreeenProp} from './types';

const OfferApplicantsScreen = ({route}: OfferApplicantsScreeenProp) => {
  const {advertId} = route.params;
  console.log(advertId);
  const {data, error, isLoading} = useFinalRoundQuery(advertId);

  console.log(data);
  return <View></View>;
};

export default OfferApplicantsScreen;
