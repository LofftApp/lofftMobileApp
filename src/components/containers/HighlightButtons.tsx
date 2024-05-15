import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import Color from '@StyleSheets/lofftColorPallet.json';
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Important Notice !!
/*
  The navigation prop has to be passed on from the corresponding parent component
*/

const HighlightButtons = ({
  goBack = true,
  navigation,
  id,
  heartPresent = true,
  color = null,
  favorite,
  onPressHeart,
}: any) => {
  const [saved, setSaved] = useState(false);

  return (
    <View
      style={[
        styles.actionContainer,
        {justifyContent: goBack ? 'space-between' : 'flex-end'},
      ]}>
      {goBack ? (
        <Pressable
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}>
          <LofftIcon
            name="chevron-left"
            size={35}
            color={color ? color : Color.Lavendar[80]}
          />
        </Pressable>
      ) : null}

      {heartPresent ? (
        <Pressable style={styles.iconContainer} onPress={onPressHeart}>
          {favorite ? (
            <LofftIcon
              name="heart-filled"
              size={35}
              color={Color.Tomato[100]}
            />
          ) : (
            <LofftIcon name="heart" size={35} color={Color.Tomato[100]} />
          )}
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    marginVertical: 50, // Might
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  iconContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default HighlightButtons;
