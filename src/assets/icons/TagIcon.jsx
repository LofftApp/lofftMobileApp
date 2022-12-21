import React, {useRef, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Animated} from 'react-native';

// Stylesheets 🖌
import {fontStyles} from '../../styles/fontStyles';

// Assets 🖼
import color from '../../styles/lofftColorPallet.json';

const TagIcon = ({text, userColor, id = false, pickCityDistrct}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  let pillColor = '';
  let pillBackgroundColor = '';
  // let tags = true;
  switch (userColor) {
    case 'Black':
      pillColor = color.Black[100];
      pillBackgroundColor = color.Black[10];
      break;
    case 'Blue':
      pillColor = color.Blue[100];
      pillBackgroundColor = color.Blue[10];
      break;
    case 'Tomato':
      pillColor = color.Tomato[100];
      pillBackgroundColor = color.Tomato[10];
      break;
    case 'Gold':
      pillColor = color.Gold[100];
      pillBackgroundColor = color.Gold[10];
      break;
    case 'Mint':
      pillColor = color.Mint[100];
      pillBackgroundColor = color.Mint[10];
      break;
    case 'White':
      pillColor = color.Black[80];
      pillBackgroundColor = 'white';
      break;
    default:
      pillColor = color.Lavendar[100];
      pillBackgroundColor = color.Lavendar[10];
      break;
  }
  return (
    <Animated.View // Special animatable View
      style={{
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      <TouchableOpacity onPress={() => pickCityDistrct(id)}>
        <View
          style={[
            styles.pill,
            {borderColor: pillColor, backgroundColor: pillBackgroundColor},
          ]}>
          <Text style={[fontStyles.bodySmall, {color: pillColor}]}>{text}</Text>
          {/* {id ? <Icon name="close-circle" size={20} color={pillColor} /> : null} */}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pill: {
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 9,
    paddingHorizontal: 40,
    marginRight: 10,
  },
});

export default TagIcon;
