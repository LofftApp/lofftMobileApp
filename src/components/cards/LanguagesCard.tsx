import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Icon} from 'react-native';

// Styles
import {fontStyles} from 'styleSheets/fontStyles';

// Colors
import Color from 'styleSheets/lofftColorPallet.json';

// Components
import LofftIcon from 'components/lofftIcons/LofftIcon';

const LanguagesCard = ({language, selected, handleSelectedLanguages}: any) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View style={[selected ? styles.Selected : styles.textContainer]}>
      <TouchableOpacity
        onPress={() => {
          setIsSelected(!isSelected);
          handleSelectedLanguages(language);
        }}>
        <View style={selected ? styles.Selected : null}>
          {selected ? (
            <LofftIcon
              name="check-verified-02"
              size={25}
              color={Color.Tomato[100]}
              style={styles.iconContainer}
            />
          ) : null}

          <Text
            style={[
              fontStyles.headerSmall,
              selected ? styles.Selected && styles.text : null,
            ]}>
            {language}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    paddingVertical: 16,
    paddingLeft: 76,
  },
  Selected: {
    backgroundColor: '#F1EDFF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 4,
  },
  text: {
    paddingLeft: 20,
  },
  iconContainer: {
    paddingLeft: 28,
  },
});

export default LanguagesCard;
