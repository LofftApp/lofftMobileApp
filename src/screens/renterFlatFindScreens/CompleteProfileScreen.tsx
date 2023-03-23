/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

//Components
import {fontStyles} from '@StyleSheets/fontStyles';
import {CoreButton} from '@Components/buttons/CoreButton';
import {CrossIcon} from '../../assets';

// Assets 🪴
import ScreenImage from '@Assets/images/Illustration.png';

//Styles
import Color from '@StyleSheets/lofftColorPallet.json';

const CompleteProfileScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={fontStyles.headerMedium}>
          Your application profile isn't complete
        </Text>
        <CrossIcon style={{
          paddingTop: 30,
        }} />
      </View>
      <View>
        <Image source={ScreenImage} />
      </View>
      <View>
        <Text style={fontStyles.bodyMedium}>
          To apply for this flat, please go to the profile section and complete
          your application. This takes only 5 minutes!
        </Text>
      </View>
      <CoreButton
        value="Complete my profile now"
        style={{
          borderWidth: 2,
          marginTop: 14,
          height: 45,
          width: '100%',
        }}
        disabled={false}
      />
      <CoreButton
        value="Do it later"
        style={{
          borderWidth: 2,
          marginTop: 14,
          height: 45,
          width: '100%',
        }}
        disabled={false}
        invert={true}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: 'space-around',
  },
});

export default CompleteProfileScreen;
