import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {AdvertWithCoordinates} from './types';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStylesTest';

const MapMarker = ({data}: {data: AdvertWithCoordinates}) => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);

  const {matchScore} = data;

  const [color] = useState((matchScore ?? 0) > 85 ? 'lavendar' : 'mint');

    const styles = StyleSheet.create({
      markerStyle: {
        height: 35,
        width: 35,
        borderRadius: 25,
        position: 'absolute',
        marginTop: 5,
        backgroundColor: colors.White[100],
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
      },
      text: {
        color: colors.Lavendar[100],
      },
  });
  return (
    <View>
      <LofftIcon
        name="union"
        color={color === 'lavendar' ? colors.Lavendar[100] : colors.Mint[100]}
        size={58}
      />
      <View style={styles.markerStyle}>
        <Text
          style={[
            fontStyles.headerSmall,
            {
              color:
                color === 'lavendar' ? colors.Lavendar[100] : colors.Mint[100],
            },
          ]}>
          {matchScore}
        </Text>
      </View>
    </View>
  );
};

export default MapMarker;
