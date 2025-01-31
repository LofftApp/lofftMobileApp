import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const SettingsUserImage = ({userImageUri}: {userImageUri: string}) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.profilePic}
        source={{
          uri: userImageUri,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },

  profilePic: {
    width: '35%',
    aspectRatio: 1,
    borderRadius: 12,
  },
});

export default SettingsUserImage;
