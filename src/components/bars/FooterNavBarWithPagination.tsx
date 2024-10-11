import React from 'react';
import {View, StyleSheet} from 'react-native';
import UserJourneyPaginationBar from 'components/buttons/NewUserJourneyPaginationBar';
import UserJourneyContinue from 'components/buttons/NewUserJourneyContinueButton';
import {size} from 'react-native-responsive-sizes';

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
    marginBottom: size(27),
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 0,
    paddingTop: size(35),
    paddingBottom: size(28),
    minHeight: size(110),
    marginTop: size(20),
  },
});

export default FooterNavBarWithPagination;
