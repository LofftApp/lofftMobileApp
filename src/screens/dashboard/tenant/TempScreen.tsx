import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';

// Redux
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';

//Styles
import Color from 'styleSheets/lofftColorPallet.json';

// Components
import {CoreButton} from 'components/buttons/CoreButton';

const TempScreen = () => {
  const [signOut] = useSignOutMutation();

  const handleSignOut = () => {
    signOut();
  };
  return (
    <View style={styles.pageContainer}>
      <View style={styles.margin}>
        <Text>Temp Screen</Text>
        <CoreButton value="Sign Out" onPress={handleSignOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginTop: 400,
  },
  pageContainer: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  imageContainer: {
    height: 300,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  marginTop400: {
    marginTop: 400,
  },
});

export default TempScreen;