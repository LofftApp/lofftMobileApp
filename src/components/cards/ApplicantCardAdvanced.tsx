import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';

// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Icons
import LofftIcon from '@Components/lofftIcons/LofftIcon';

// External
import CheckBox from '@Components/coreComponents/interactiveElements/CheckBox';

const ApplicantsCardAdvanced = ({
  name,
  match,
  image,
  id,
  selectProfile,
}: any) => {

  const [activateBox, setActiveBox] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardInnerWrapper}>
        <CheckBox
          value={activateBox}
          onPress={() => {
            setActiveBox(!activateBox);
            selectProfile(id);
          }}
        />

        <Image
          source={{
            uri: `${image}`,
          }}
          style={styles.avatar}
        />
        <View>
          <Text>{name}</Text>
          <Text>{match}</Text>
        </View>

        <LofftIcon
          style={styles.icon}
          name={'chevron-right'}
          size={28}
          color={Color.Blue[100]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: '14%',
    marginTop: 10,
    backgroundColor: Color.Lavendar[10],
    marginHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
    width: '90%'
  },
  cardInnerWrapper: {
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    height: '80%',
    width: '32%',
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  icon: {
    position: 'absolute',
    right: 0,
  }
});

export default ApplicantsCardAdvanced;
