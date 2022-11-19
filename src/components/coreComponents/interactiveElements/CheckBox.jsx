import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../styles/lofftColorPallet.json';

const CheckBox = ({disabled = false, value = true, onPress}) => {
  return (
    <View style={[styles.CBContainer, disabled ? styles.disabled : null]}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Icon
          name={!disabled || value ? 'close-outline' : null}
          style={styles.xIcon}
          color={colors.Lavendar[100]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  CBContainer: {
    width: 45,
    height: 45,
    borderColor: colors.Lavendar[100],
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    marginVertical: 10,
  },
  xIcon: {
    fontSize: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 50,
    height: 50,
    padding: 0,
    marginBottom: 3,
  },
  disabled: {
    borderColor: colors.Black[50],
    backgroundColor: colors.Black[10],
  },
});

export default CheckBox;
