import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import Color from '@StyleSheets/lofftColorPallet.json';
import LofftIcon from '@Components/lofftIcons/LofftIcon';

// DB actions

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {updateDoc} from '@react-native-firebase/firestore';

// Important Notice !!
/*
  The navigation prop has to be passed on from the corresponding parent component
*/

const HighlightedButtons = ({navigation, id}) => {
  const [saved, setSaved] = useState(false);

  const pressHeart = async (currentHeartState, id) => {

    const uid = auth().currentUser?.uid;
    const db = firestore();

    setSaved(!currentHeartState);

    try {
      if (saved){
        await db
          .collection('users')
          .doc(uid)
          .update({
            savedFlats: firestore.FieldValue.arrayRemove('1234'), // '1234 should be replaced with id number'
          });
      } else {
        await db
          .collection('users')
          .doc(uid)
          .update({
            savedFlats: firestore.FieldValue.arrayUnion('6728'), // '1234 should be replaced with id '
          });
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <View style={styles.actionContainer}>
      <Pressable
        style={styles.iconContainer}
        onPress={() => navigation.goBack()}>
        <LofftIcon name="chevron-left" size={35} color={Color.Lavendar[80]} />
      </Pressable>

      <Pressable style={styles.iconContainer} onPress={() => pressHeart(saved)}>
        {saved ? (
          <LofftIcon name="heart-filled" size={35} color={Color.Tomato[100]} />
        ) : (
          <LofftIcon name="heart" size={35} color={Color.Tomato[100]} />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    marginVertical: 50, // Might
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default HighlightedButtons;
