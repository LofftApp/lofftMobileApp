import React, {useRef} from 'react';
import {View, Text, StyleSheet, Pressable, Animated} from 'react-native';

// Styles
import {fontStyles} from 'styleSheets/fontStyles';

// Colors
import Color from 'styleSheets/lofftColorPallet.json';

// Components
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Types
import {LanguagesCardProps} from './types';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

const LanguagesCard = ({
  language,
  selected,
  handleSelectedLanguages,
}: LanguagesCardProps) => {
  // Create animation values for fading and scaling
  const fadeAnim = useRef(new Animated.Value(1)).current; // For fading in and out
  const translateY = useRef(new Animated.Value(0)).current; // For movement up/down

  // Handle press and toggle between selected/unselected with animation
  const handlePress = () => {
    // Animate fade out and translate
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -10,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // After fade out, handle selection and fade it back in the correct list
      handleSelectedLanguages(language);
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  };
  const container = selected ? styles.selectedContainer : styles.notSelected;
  return (
    <Animated.View
      style={[
        container,
        {
          opacity: fadeAnim,
          transform: [{translateY}],
        },
      ]}>
      <Pressable onPress={handlePress}>
        <View style={selected ? styles.selected : styles.textContainer}>
          {selected && (
            <LofftIcon
              name="check-verified-02"
              size={25}
              color={Color.Lavendar[100]}
            />
          )}

          <Text
            style={[
              fontStyles.headerSmall,
              selected ? styles.selectedText : null,
            ]}>
            {language}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  selectedContainer: {
    paddingVertical: size(10),
    paddingHorizontal: size(20),
  },
  notSelected: {
    paddingVertical: size(0),
    paddingHorizontal: size(0),
  },

  selected: {
    backgroundColor: '#F1EDFF',
    borderRadius: size(8),
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: size(10),
  },
  textContainer: {
    paddingVertical: size(16),
    paddingLeft: size(76),
  },
  selectedText: {
    paddingLeft: size(20),
  },
});

export default LanguagesCard;
