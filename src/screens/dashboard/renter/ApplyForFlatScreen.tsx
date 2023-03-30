import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

// Components 🪢
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';
import ConfirmationScreenComponent from '@Components/cards/confirmationScreenComponent';

const ApplyForFlatScreen = ({navigation, route}: any) => {
  const pageData =
    route.params?.lessorObject || route.params?.renterObject || {};

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <ConfirmationScreenComponent
        navigation={navigation}
        pageData={pageData}
      />
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  itemsWrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 50,
    zIndex: -1,
    left: -20,
  },
  hack: {
    textAlign: 'center',
    marginTop: 24,
  },
  buttonsWrap: {
    marginTop: 48,
    width: '100%',
  },
  buttonStyle: {
    width: '100%',
    marginBottom: 10,
  },
});

export default ApplyForFlatScreen;
