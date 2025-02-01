import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
//Redux

//Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

//Components
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Helpers
import {size} from 'react-native-responsive-sizes';

import {SettingsCardProps} from './types';
import {useUserType} from 'hooks/useUserType';

// Constants
// Types

const SettingsCard = ({
  settingsData: {title, icon, subtitle, id, navigate},
}: SettingsCardProps) => {
  const {isLessor} = useUserType();
  const hasArrowArr = [1, 2, 3, 4, 5];
  const isDelete = id === 7;
  const hasArrow = hasArrowArr.includes(id);

  const handleNavigate = () => {
    navigate();
  };

  const {width} = useWindowDimensions();

  return (
    <View style={[styles.outterContainer, {width: width - 30}]}>
      <Pressable onPress={handleNavigate}>
        <View style={[styles.innerContainer]}>
          <View style={styles.details}>
            <LofftIcon
              name={icon}
              size={25}
              color={isDelete ? Color.Tomato[100] : Color.Black[100]}
            />
            <View style={styles.titleContainer}>
              <Text
                style={[
                  fontStyles.headerSmall,
                  styles.nameMargin,
                  isDelete && {color: Color.Tomato[100]},
                ]}>
                {title}
              </Text>
              {subtitle && (
                <Text style={[fontStyles.bodySmall, styles.subtitle]}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.iconContainer}>
            <LofftIcon
              name="chevron-right"
              size={35}
              color={
                hasArrow
                  ? isLessor
                    ? Color.Lavendar[80]
                    : Color.Mint[100]
                  : Color.White[80]
              }
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outterContainer: {
    backgroundColor: Color.White[100],
    borderRadius: 12,
    marginBottom: size(20),
    paddingHorizontal: size(5),
    paddingVertical: size(8),
    height: 'auto',
  },

  innerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(30),
  },
  titleContainer: {
    alignItems: 'flex-start',
    gap: size(10),
  },
  subtitleContainer: {
    marginLeft: size(15),
  },
  subtitle: {
    color: Color.Black[50],
  },
  matcher: {
    color: Color.Mint[100],
  },
  collapsedExpand: {
    marginTop: size(10),
    gap: size(10),
    height: 'auto',
  },

  nameMargin: {
    marginRight: size(20),
  },
  chipsContainer: {
    flexWrap: 'wrap',
  },

  iconContainer: {
    padding: size(10),
  },
});

export default SettingsCard;
