import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// Helpers 🥷🏻
import { size } from 'react-native-responsive-sizes';
import { truncateTextAtWord } from 'helpers/truncateTextAtWord';
import { checkMessageDate } from 'helpers/checkMessageDate';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';
import { fontStyles } from 'styleSheets/fontStyles';

// Types 🦄
import { ChatCardProps } from './types';

const hardcodedImages = [
  'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4524.jpg.webp',
];

const ChatCard = ({match, name, read, photo, content, createdAt}:ChatCardProps) => {

  return(
    <View style={[styles.container, {backgroundColor: read ? Color.White[100] : Color.Lavendar[10] }]}>
        <View style={styles.boxA}>
          <Image style={styles.image} source={{uri: photo || hardcodedImages[0] }} />
        </View>
        <View style={styles.boxB}>
          <View style={styles.innerBoxBup}>
            <View>
               <Text style={fontStyles.headerSmall}>
                {read ? null : <Text style={styles.unreadDot}>●</Text>} {name}
              </Text>
              <Text style={[fontStyles.bodySmall, {color: Color.Black[50]}]}>🌟 {match}% match</Text>
            </View>
            <View>
              <Text style={[fontStyles.bodySmall, styles.timeFont]}>{checkMessageDate(createdAt)}</Text>
            </View>
          </View>
          <View style={styles.innerBoxBdown}>
            <Text style={[fontStyles.bodyMedium, {color: Color.Black[80]}]}>{truncateTextAtWord(content, 20)} ...</Text>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: size(117),
    backgroundColor: 'pink',
    flexDirection: 'row',
    padding: size(10),
    borderRadius: 12,
    marginTop: 10,
  },
  boxA: {
    width: '30%',
    height: '100%',
  },
  image:{
    width:'100%',
    height: '100%',
    borderRadius: 8,
  },
  boxB: {
    width: '70%',
    height: '100%',
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  unreadDot:{
    color: Color.Lavendar[100],
  },
  innerBoxBup:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeFont: {
    color: Color.Black[50],
    paddingTop: 5,
  },
  innerBoxBdown:{
    justifyContent: 'flex-end',
  },
});

export default ChatCard;
