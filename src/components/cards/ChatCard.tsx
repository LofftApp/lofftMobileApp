import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Helpers 🥷🏻
import { size } from 'react-native-responsive-sizes';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';

// Types 🦄
import { ChatCardProps } from './types';

const ChatCard = ({name, read}:ChatCardProps) => {
  return(
    <View style={[styles.container, {backgroundColor: read ? Color.White[100] : Color.Lavendar[10] }]}>
        <View style={styles.innerBoxA} />
        <View style={styles.innerBoxB} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: size(115),
    backgroundColor: 'pink',
    flexDirection: 'row',
    padding: size(10),
  },
  innerBoxA: {
    width: '30%',
    height: '100%',
    backgroundColor: 'lightgrey',
  },
  innerBoxB: {
    width: '70%',
    height: '100%',
    backgroundColor: 'lightblue',
  },

});

export default ChatCard;
