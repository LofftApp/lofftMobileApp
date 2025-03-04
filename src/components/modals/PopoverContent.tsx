import {CoreButton} from 'components/buttons/CoreButton';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

type PopoverContentProps = {
  text1: string;
  icon1?: string;
  text2?: string;
  icon2?: string;
  button?: boolean;
  buttonValue?: string;
  setShowPopover: (value: boolean) => void;
  bgColor?: string;
  btnColor?: string;
};

const PopoverContent = ({
  icon1,
  text1,
  icon2,
  text2,
  button,
  buttonValue = 'Got it',
  setShowPopover,
  bgColor = Color.Mint[20],
  btnColor = Color.Lavendar[100],
}: PopoverContentProps) => {
  return (
    <>
      <View
        style={[
          styles.popoverContent,
          {backgroundColor: bgColor, borderColor: bgColor},
        ]}>
        <View style={styles.popoverText}>
          <LofftIcon name={icon1 ?? ''} size={25} color={Color.Lavendar[100]} />
          <Text style={fontStyles.headerTiny}>{text1}</Text>
        </View>
        {text2 && (
          <View style={[styles.popoverText, !icon2 && {marginLeft: size(38)}]}>
            {icon2 && (
              <LofftIcon
                name={icon2 ?? ''}
                size={25}
                color={Color.Lavendar[100]}
              />
            )}
            <Text style={fontStyles.bodyExtraSmall}>{text2}</Text>
          </View>
        )}
      </View>
      {button && (
        <CoreButton
          value={buttonValue}
          onPress={() => setShowPopover(false)}
          style={[
            styles.buttonStyle,
            {backgroundColor: btnColor, borderColor: btnColor},
          ]}
          textSize={fontStyles.bodyTiny}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  popoverContent: {
    paddingHorizontal: size(8),
    justifyContent: 'center',
    gap: size(10),
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  popoverText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(10),
    width: '90%',
  },

  buttonStyle: {
    borderRadius: 12,
    borderWidth: 2,
    width: size(72),
    height: size(41),
    marginLeft: size(10),
  },
});

export default PopoverContent;
