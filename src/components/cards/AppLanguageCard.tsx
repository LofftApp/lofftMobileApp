import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Animated,
} from 'react-native';

//Redux
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useAppLanguage} from 'reduxFeatures/settings/useAppLanguage';

//Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

//Components
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Helpers
import {size} from 'react-native-responsive-sizes';

import {AppLanguageCardScreenProps} from './types';
import { useFadeInAnimation } from 'hooks/useFadeInAnimation';

// Constants
// Types

const AppLanguageCard = ({
  languageData: {id, name},
}: AppLanguageCardScreenProps) => {
  const {isLessor} = useUserType();
  const {appLanguage, setAppLanguage} = useAppLanguage(); // Get language state from Redux
  const {fadeInAnim} = useFadeInAnimation();
  const isSelected = appLanguage === id;
  const handleSelectLanguage = () => {
    setAppLanguage(id);
  };

  const {width} = useWindowDimensions();
  const bgColor = isSelected
    ? isLessor
      ? Color.Lavendar[20]
      : Color.Mint[20]
    : Color.White[10];
  return (
    <Animated.View
      style={[
        styles.outterContainer,
        {width: width - 30},
        {backgroundColor: bgColor},
        {opacity: fadeInAnim},
      ]}>
      <Pressable onPress={handleSelectLanguage}>
        <View style={[isSelected ? styles.selected : styles.innerContainer]}>
          <View style={styles.details}>
            <LofftIcon
              name="check-verified-02"
              size={25}
              color={
                isSelected
                  ? isLessor
                    ? Color.Lavendar[100]
                    : Color.Mint[100]
                  : Color.White[10]
              }
            />
            <View style={styles.titleContainer}>
              <Text
                style={[
                  fontStyles.headerSmall,
                  styles.nameMargin,
                  {color: isSelected ? Color.Black[100] : Color.Black[50]},
                ]}>
                {name}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
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
    paddingHorizontal: size(20),
    paddingVertical: size(10),
  },
  selected: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: size(20),
    paddingVertical: size(10),
    width: '100%',
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

export default AppLanguageCard;
