import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

// Components 🪢
import LofftIcon from '@Components/lofftIcons/LofftIcon';

// StyleSheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

const HeaderPageContentSwitch = ({
  toggleNames,
  toggleIcons,
  activeScreen,
  setActiveScreen,
  markers,
}: any) => {
  return (
    <View style={styles.viewToggle}>
      <Pressable
        style={[
          styles.toggleButton,
          activeScreen === markers[0] ? styles.toggleButtonActive : null,
        ]}
        onPress={() => setActiveScreen(markers[0])}>
        <LofftIcon
          name={toggleIcons[0]}
          size={20}
          color={
            activeScreen === markers[0] ? Color.White[100] : Color.Lavendar[50]
          }
        />
        <Text
          style={[
            fontStyles.bodyMedium,
            styles.toggleButtonText,
            activeScreen === markers[0] ? styles.toggleButtonTextActive : null,
          ]}>
          {toggleNames[0]}
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.toggleButton,
          activeScreen === markers[1] ? styles.toggleButtonActive : null,
        ]}
        onPress={() => setActiveScreen(markers[1])}>
        <LofftIcon
          name={toggleIcons[1]}
          size={20}
          color={
            activeScreen === markers[1] ? Color.White[100] : Color.Lavendar[100]
          }
        />
        <Text
          style={[
            fontStyles.bodyMedium,
            styles.toggleButtonText,
            activeScreen === markers[1] ? styles.toggleButtonTextActive : null,
          ]}>
          {toggleNames[1]}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: Color.Lavendar[100],
    borderWidth: 2,
    borderRadius: 12,
    marginTop: 15,
    height: 40,
    marginBottom: 8,
    marginHorizontal: 16,
    backgroundColor: Color.White[100],
    zIndex: 2,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  toggleButtonActive: {
    backgroundColor: Color.Lavendar[100],
  },
  toggleButtonText: {
    marginLeft: 5,
    color: Color.Lavendar[100],
  },
  toggleButtonTextActive: {
    color: Color.White[100],
  },
});

export default HeaderPageContentSwitch;
