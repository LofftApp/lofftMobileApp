import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Styles
import {fontStyles} from 'styleSheets/fontStyles';

// Colors
import Color from 'styleSheets/lofftColorPallet.json';

// Components
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Types
import {LanguagesCardProps} from './types';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

const LanguagesCard = ({
  language,
  selected,
  handleSelectedLanguages,
}: LanguagesCardProps) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View style={[selected ? styles.Selected : styles.textContainer]}>
      <Pressable
        onPress={() => {
          setIsSelected(!isSelected);
          handleSelectedLanguages(language);
        }}>
        <View style={selected && styles.Selected}>
          {selected && (
            <LofftIcon
              name="check-verified-02"
              size={25}
              color={Color.Tomato[100]}
              style={styles.iconContainer}
            />
          )}

          <Text
            style={[
              fontStyles.headerSmall,
              selected ? styles.Selected && styles.text : null,
            ]}>
            {language}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    paddingVertical: size(16),
    paddingLeft: size(76),
  },
  Selected: {
    backgroundColor: '#F1EDFF',
    borderRadius: size(8),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: size(8),
    paddingVertical: size(4),
  },
  text: {
    paddingLeft: size(20),
  },
  iconContainer: {
    paddingLeft: size(28),
  },
});

export default LanguagesCard;
