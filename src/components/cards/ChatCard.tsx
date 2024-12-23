import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';
import {truncateTextAtWord} from 'helpers/truncateTextAtWord';
import {checkMessageDate} from 'helpers/checkMessageDate';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Types 🦄
import {ChatCardProps} from './types';

const hardcodedImages = [
  'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4524.jpg.webp',
];

const ChatCard = ({ chatroomData, isLessor }: ChatCardProps) => {
  const { matchScore, name, message, userPhoto, advertTagLine } = chatroomData;
  const { read, content, createdAt } = message ?? {};
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkingInterval = setInterval(() => setIsBlinking((prev) => !prev), 3000);
    return () => clearInterval(blinkingInterval);
  }, []);


  const renderMessageText = () => {
    if (message === null) {
      const blinkingStyle = isLessor ? styles.textGlowingLessor : styles.textGlowingTenant;
      return (
        <Text style={[fontStyles.bodyMedium, isBlinking && blinkingStyle]}>
          Start Chat 🚀
        </Text>
      );
    }

    return isLessor
      ? `🌟 ${matchScore}% match`
      : truncateTextAtWord(advertTagLine ?? '', 20);
  };

  return (
    <View
    style={[
      styles.container,
      isLessor
        ? read
          ? styles.lessorContainerBgWhite
          : styles.lessorContainerBg
        : read
        ? styles.lessorContainerBgWhite
        : styles.tenantContainerBg,
        ]}
      >

      <View style={styles.boxA}>
        <Image
          style={styles.image}
          source={{ uri: userPhoto || hardcodedImages[0] }}
        />
      </View>
      <View style={styles.boxB}>
        <View style={styles.innerBoxBup}>
          <View>
            <Text style={fontStyles.headerSmall}>
              {!read && (
                <Text style={isLessor ? styles.lessorDot : styles.tenantDot}>
                  ●
                </Text>
              )}{' '}
              {name}
            </Text>
            <Text style={[fontStyles.bodySmall, { color: Color.Black[50] }]}>
              {renderMessageText()}
            </Text>
          </View>
          <Text style={[fontStyles.bodySmall, styles.timeFont]}>
            {message !== null && checkMessageDate(createdAt ?? '')}
          </Text>
        </View>
        <View style={styles.innerBoxBdown}>
          <Text style={[fontStyles.bodyMedium, { color: Color.Black[100] }]}>
            {message !== null && `${truncateTextAtWord(content ?? '', 20)} ...`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: size(117),
    flexDirection: 'row',
    padding: size(10),
    borderRadius: 12,
    marginTop: 10,
  },
  boxA: {
    width: '30%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  boxB: {
    width: '70%',
    height: '100%',
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  innerBoxBup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerBoxBdown: {
    justifyContent: 'flex-end',
  },
  timeFont: {
    color: Color.Black[50],
    paddingTop: 5,
  },
  lessorContainerBg: {
    backgroundColor: Color.Lavendar[10],
  },
  lessorContainerBgWhite: {
    backgroundColor: Color.White[100],
  },
  tenantContainerBg: {
    backgroundColor: Color.Mint[10],
  },
  lessorDot: {
    color: Color.Lavendar[100],
  },
  tenantDot: {
    color: Color.Mint[100],
  },
  textGlowingLessor: {
    color: Color.Lavendar[100],
    textShadowColor: 'rgba(203, 188, 255, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
  },
  textGlowingTenant: {
    color: Color.Mint[100],
    textShadowColor: 'rgba(188, 255, 200, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
  },
});

export default ChatCard;
