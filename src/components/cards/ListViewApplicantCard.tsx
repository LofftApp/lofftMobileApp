import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Redux 🏗️
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';

// Firebase & API 🧠
import auth from '@react-native-firebase/auth';

// Components 🪢
import {CoreButton} from '@Components/buttons/CoreButton';
import Chips from '@Components/buttons/Chips';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';
import Collapsible from 'react-native-collapsible';
import CheckBox from '@Components/coreComponents/interactiveElements/CheckBox';

// Assets 🪴
import LofftIcon from '@Components/lofftIcons/LofftIcon';

const ApplicantsCard = ({}: any) => {
  const [activateBox, setActiveBox] = useState(false);
  const [hasCollapsed, setHasCollapsed] = useState(true);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.closedCardWrapper}>
        <View style={styles.buttonTextContainer}>
          <CheckBox
            value={activateBox}
            onPress={() => {
              setActiveBox(!activateBox);
            }}
          />
          <View style={styles.textContainer}>
            <Text style={fontStyles.headerMedium}>J.</Text>
            <Text style={[fontStyles.bodyMedium, styles.matchText]}>
              (96%match)
            </Text>
          </View>
        </View>
        <Pressable onPress={() => setHasCollapsed(!hasCollapsed)} style={styles.iconCollapser}>
          {hasCollapsed ? (
            <LofftIcon name="chevron-down" size={24} style={styles.iconColor} />
          ) : (
            <LofftIcon name="chevron-up" size={24} style={styles.iconColor} />
          )}
        </Pressable>
      </View>
      <Collapsible collapsed={hasCollapsed}>
        <View>
          <Text style={fontStyles.headerSmall}>Match with you</Text>
          <Chips />
          <Text style={[fontStyles.headerSmall, styles.otherText]}>Other</Text>
          <Chips />
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 8,
    backgroundColor: Color.Lavendar[5],
  },
  closedCardWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderRadius: 8,
  },
  buttonTextContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  textContainer: {
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchText: {
    color: Color.Mint[100],
    paddingHorizontal: 5,
  },
  otherText: {
    paddingTop: 10,
  },
  iconCollapser: {
    paddingRight: 16,
  },
  iconColor: {
    color: Color.Blue[100],
  },
});

export default ApplicantsCard;
