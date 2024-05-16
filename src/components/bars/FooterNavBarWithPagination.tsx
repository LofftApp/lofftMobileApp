import React from 'react';
import {View, StyleSheet} from 'react-native';
import UserJourneyPaginationBar from 'reduxFeatures/registration/UserJourneyPaginationBar';
import UserJourneyContinue from 'reduxFeatures/registration/UserJourneyContinue';

const FooterNavBarWithPagination = ({
  onPress,
  disabled = false,
  details,
  buttonValue = 'Continue',
}: any) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.paginationContainer}>
        <UserJourneyPaginationBar />
      </View>

      <UserJourneyContinue
        value={buttonValue}
        disabled={disabled}
        onPress={(value: any) => {
          onPress(value);
        }}
        details={details}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    marginBottom: 57,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 0,
    paddingTop: 35,
    paddingBottom: 28,
    minHeight: 150,
    marginTop: 25,
  },
});

export default FooterNavBarWithPagination;
