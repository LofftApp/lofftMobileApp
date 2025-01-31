import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';
import {truncateTextAtWord} from 'helpers/truncateTextAtWord';
import {checkMessageDate} from 'helpers/checkMessageDate';

// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Types 🦄
import {ChatCardProps} from 'reduxFeatures/chatrooms/types';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

const hardcodedImages = [
  'https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4524.jpg.webp',
];

const ChatCard = ({chatroomData, isLessor}: ChatCardProps) => {
  const {matchScore, name, message, userPhoto, advertTagLine} = chatroomData;
  const {read, content, createdAt} = message ?? {};
  const {data: currentUser} = useGetUserQuery();

  const renderMessageText = () => {
    if (!message) {
      return <Text style={fontStyles.bodyMedium}>Start Chat 🚀</Text>;
    }

    return isLessor
      ? `🌟 ${matchScore}% match`
      : truncateTextAtWord(advertTagLine ?? '', 20);
  };

  return (
    <View
      style={[
        styles.container,
        message?.userId === currentUser?.id
          ? styles.chatContainerWhite
          : message?.userId !== currentUser?.id && isLessor && !read
          ? styles.lessorContainerBg
          : message?.userId !== currentUser?.id && !isLessor && !read
          ? styles.tenantContainerBg
          : message?.userId !== currentUser?.id && read
          ? styles.chatContainerWhite
          : null,
      ]}>
      <View style={styles.boxA}>
        <Image
          style={styles.image}
          source={{uri: userPhoto || hardcodedImages[0]}}
        />
      </View>
      <View style={styles.boxB}>
        <View style={styles.innerBoxBup}>
          <View>
            <Text style={fontStyles.headerSmall}>
              {!read && currentUser?.id !== message?.userId && (
                <>
                  <Text style={isLessor ? styles.lessorDot : styles.tenantDot}>
                    ●
                  </Text>{' '}
                </>
              )}
              {name}
            </Text>
            <Text style={[fontStyles.bodySmall, {color: Color.Black[50]}]}>
              {renderMessageText()}
            </Text>
          </View>
          <Text style={[fontStyles.bodySmall, styles.timeFont]}>
            {message && checkMessageDate(createdAt ?? '')}
          </Text>
        </View>
        <View style={styles.innerBoxBdown}>
          <Text style={[fontStyles.bodyMedium, {color: Color.Black[100]}]}>
            {message && `${truncateTextAtWord(content ?? '', 15)} ...`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: size(117),
    flexDirection: 'row',
    padding: size(10),
    borderRadius: 12,
    marginTop: 10,
    backgroundColor: 'blue',
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
  chatContainerWhite: {
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
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 15,
  },
  textGlowingTenant: {
    color: Color.Mint[100],
    textShadowColor: 'rgba(188, 255, 200, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 15,
  },
});

export default ChatCard;
