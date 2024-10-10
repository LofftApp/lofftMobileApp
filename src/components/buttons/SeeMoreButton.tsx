import React, {useRef, useEffect} from 'react';
import {Pressable, StyleSheet, Text, Animated} from 'react-native';
// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';
// Components
import LofftIcon from 'components/lofftIcons/LofftIcon';
// Helpers
import {size} from 'react-native-responsive-sizes';
// Types
import {SeeMoreButtonProps} from './types';

function SeeMoreButton({collapsed, toggleExpand}: SeeMoreButtonProps) {
  const rotateAnim = useRef(new Animated.Value(collapsed ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: collapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [collapsed, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  return (
    <Pressable onPress={toggleExpand} style={styles.seeMoreContainer}>
      <Text style={[fontStyles.bodySmall, styles.seeMore]}>
        {collapsed ? 'See less' : 'See more'}
      </Text>
      <Animated.View style={{transform: [{rotate}]}}>
        <LofftIcon name="chevron-up" size={25} color={Color.Blue[100]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  seeMore: {
    color: Color.Blue[100],
    marginHorizontal: size(5),
    marginBottom: size(2),
  },
  seeMoreContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingBottom: size(10),
  },
});

export default SeeMoreButton;
