import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Redux 🏗️
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';

// Components 🪢
import {CoreButton} from 'components/buttons/CoreButton';
import Chips from 'components/buttons/Chips';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';
import Collapsible from 'react-native-collapsible';
import CheckBox from 'components/coreComponents/interactiveElements/CheckBox';

// Assets 🪴
import LofftIcon from 'components/lofftIcons/LofftIcon';

const ApplicantsCard = ({email}: any) => {
  const [activateBox, setActiveBox] = useState(false);
  const [hasCollapsed, setHasCollapsed] = useState(true);

  // getting the first name from the database+capitalizing it
  // getting the Match percentage from the database
  // annoy james into showing me how to do the whole thing so i can do it myself

  const firstLetter = email.charAt(0).toUpperCase();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.insideContainer}>
        <CheckBox
          value={activateBox}
          onPress={() => {
            setActiveBox(!activateBox);
          }}
        />
        <Pressable
          onPress={() => setHasCollapsed(!hasCollapsed)}
          style={styles.iconCollapser}>
          <View style={styles.closedCardWrapper}>
            <View style={styles.textContainer}>
              <Text style={fontStyles.headerMedium}>{firstLetter}.</Text>
              <Text style={[fontStyles.bodyMedium, styles.matchText]}>
                (92%match)
              </Text>
            </View>
            {hasCollapsed ? (
              <LofftIcon
                name="chevron-down"
                size={24}
                style={styles.iconColor}
              />
            ) : (
              <LofftIcon name="chevron-up" size={24} style={styles.iconColor} />
            )}
          </View>
        </Pressable>
      </View>
      <Collapsible collapsed={hasCollapsed}>
        <View style={styles.collapisbleContainer}>
          <Text style={fontStyles.headerSmall}>Match with you</Text>
          {/* <Chips /> */}
          <Text>Hello</Text>
          <Text style={[fontStyles.headerSmall, styles.otherText]}>Other</Text>
          {/* <Chips /> */}
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 8,
    backgroundColor: Color.Lavendar[5],
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  insideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  collapisbleContainer: {
    backgroundColor: Color.Lavendar[5],
    paddingBottom: 12,
  },
  closedCardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '87%',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchText: {
    color: Color.Mint[100],
    paddingHorizontal: 8,
  },
  otherText: {
    paddingTop: 10,
  },
  iconCollapser: {
    paddingHorizontal: 16,
  },
  iconColor: {
    color: Color.Blue[100],
  },
});

export default ApplicantsCard;
