import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// External
import CheckBox from '@Components/coreComponents/interactiveElements/CheckBox';

const ApplicantsCardAdvanced = ({name, match, image, id, selectProfile}: any) => {
  const [activateBox, setActiveBox] = useState(false);
  return (
    <View style={styles.cardContainer}>
      <Text>{name}</Text>
      <CheckBox
        value={activateBox}
        onPress={() => {
          setActiveBox(!activateBox);
          selectProfile(id);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: '17%',
    marginTop: 10,
    backgroundColor: Color.Lavendar[10],
    marginHorizontal: 10,
    borderRadius: 12,
  },
});

export default ApplicantsCardAdvanced;
