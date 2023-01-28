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
          activeScreen === toggleNames[0] ? styles.toggleButtonActive : null,
        ]}
        onPress={() => setActiveScreen(markers[0])}>
        <LofftIcon
          name={toggleIcons[0]}
          size={20}
          color={
            activeScreen === markers[0] ? Color.Lavendar[100] : Color.Black[50]
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
            activeScreen === markers[1] ? Color.Lavendar[100] : Color.Black[50]
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
    marginTop: 8,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
    paddingTop: 18,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  toggleButtonActive: {
    borderColor: Color.Lavendar[100],
  },
  toggleButtonText: {
    marginLeft: 5,
  },
  toggleButtonTextActive: {
    color: Color.Lavendar[100],
  },
});

export default HeaderPageContentSwitch;
