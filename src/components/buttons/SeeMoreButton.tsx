import React, {useRef, useEffect} from 'react';
import {Pressable, StyleSheet, Text, Animated} from 'react-native';
// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStylesTest';
// Components
import LofftIcon from 'components/lofftIcons/LofftIcon';
// Helpers
import {size} from 'react-native-responsive-sizes';
// Types
import {SeeMoreButtonProps} from './types';


function SeeMoreButton({
  collapsed,
  toggleExpand,
  noText = false,
  iconSize = size(25),
}: SeeMoreButtonProps) {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);
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

  const styles = StyleSheet.create({
    seeMore: {
      color: colors.Blue[100],
      marginHorizontal: size(5),
      marginBottom: size(2),
    },
    seeMoreContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      paddingBottom: size(10),
    },
  });

  return (
    <Pressable onPress={toggleExpand} style={styles.seeMoreContainer}>
      {!noText && (
        <Text style={[fontStyles.bodySmall, styles.seeMore]}>
          {collapsed ? 'See less' : 'See more'}
        </Text>
      )}
      <Animated.View style={{transform: [{rotate}]}}>
        <LofftIcon name="chevron-up" size={iconSize} color={colors.Blue[100]} />
      </Animated.View>
    </Pressable>
  );
}


export default SeeMoreButton;
