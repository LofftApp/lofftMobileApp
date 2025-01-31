import LofftIcon from 'components/lofftIcons/LofftIcon';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import Color from 'styleSheets/lofftColorPallet.json';

const SettingsUserImage = ({userImageUri}: {userImageUri: string}) => {
  const handlePress = () => {
    console.log('Edit button pressed');
  };
  return (
    <Pressable style={styles.imageContainer} onPress={handlePress}>
      {/* Profile Image */}
      <Image style={styles.profilePic} source={{uri: userImageUri}} />

      {/* Edit Button */}
      <View style={styles.editButton}>
        <LofftIcon name="edit" size={20} color="white" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    position: 'relative', // Ensure relative positioning for absolute child
  },

  profilePic: {
    width: '35%',
    aspectRatio: 1,
    borderRadius: 12,
  },

  editButton: {
    position: 'absolute',
    bottom: 0,
    right: size(142),
    backgroundColor: Color.White[50], // Semi-transparent background

    padding: 6,
    borderRadius: 10, // Make it circular
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsUserImage;
