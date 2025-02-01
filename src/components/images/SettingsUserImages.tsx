import {useNavigation} from '@react-navigation/native';
import ImageEditButton from 'components/buttons/ImageEditButton';
import {SettingsScreenNavigationProp} from 'navigationStacks/types';
import React from 'react';
import {Image, Pressable, StyleSheet, useWindowDimensions} from 'react-native';

const SettingsUserImage = ({userImageUri}: {userImageUri: string}) => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const {width} = useWindowDimensions();
  const handlePress = () => {
    navigation.navigate('EditProfileScreen');
  };
  return (
    <Pressable style={styles.imageContainer} onPress={handlePress}>
      <Image
        style={[styles.profilePic, {width: width * 0.33}]}
        source={{uri: userImageUri}}
      />

      <ImageEditButton right={width * 0.303} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
  },

  profilePic: {
    aspectRatio: 1,
    borderRadius: 12,
  },
});

export default SettingsUserImage;
