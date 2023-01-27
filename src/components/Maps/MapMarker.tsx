import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Components 🪢
import LofftIcon from '@Components/lofftIcons/LofftIcon';

// StyleSheet 🖼️
import Colors from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

const MapMarker = ({data}: any) => {
  const [color] = useState(data?.matchP > 85 ? 'lavendar' : 'mint');
  return (
    <View>
      <LofftIcon
        name="union"
        color={color === 'lavendar' ? Colors.Lavendar[100] : Colors.Mint[100]}
        size={58}
      />
      <View style={styles.markerStyle}>
        <Text
          style={[
            fontStyles.headerSmall,
            {
              color:
                color === 'lavendar' ? Colors.Lavendar[100] : Colors.Mint[100],
            },
          ]}>
          {data?.matchP}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  markerStyle: {
    height: 35,
    width: 35,
    borderRadius: 25,
    position: 'absolute',
    marginTop: 5,
    backgroundColor: Colors.White[100],
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.Lavendar[100],
  },
});

export default MapMarker;
