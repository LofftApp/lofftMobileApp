import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';

// Icons
import LofftIcon from 'components/lofftIcons/LofftIcon';

// External
import CheckBox from 'components/coreComponents/interactiveElements/CheckBox';

const ApplicantsCardAdvanced = ({
  name,
  match,
  image,
  id,
  selectProfile,
  maxSelect,
  currentSelectedNums,
  navigation,
}: any) => {
  const [activateBox, setActiveBox] = useState(false);

  const defaultBehaviour = () => {
    if (currentSelectedNums >= maxSelect) {
      if (activateBox) {
        setActiveBox(false);
        selectProfile(id);
      }
    } else {
      setActiveBox(!activateBox);
      selectProfile(id);
    }
  };

  return (
    <View style={styles.cardInnerWrapper}>
      <CheckBox
        value={activateBox}
        style={styles.margin10Left}
        onPress={() => {
          defaultBehaviour();
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
        onPress={() => navigation.navigate('ApplicantProfileScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardInnerWrapper: {
    width: '90%',
    padding: 20,
    marginTop: 10,
    backgroundColor: Color.Lavendar[10],
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 12,
  },
  avatar: {
    height: 90,
    width: '32%',
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  icon: {
    position: 'absolute',
    right: 0,
  },
  margin10Left: {
    marginLeft: 10,
  },
});

export default ApplicantsCardAdvanced;
