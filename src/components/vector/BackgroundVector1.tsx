import { Vector1, Vector5 } from 'assets';
import React from 'react';
import {StyleSheet} from 'react-native';

const BackgroundVector1 = () => {
  return (
    <>
      <Vector1 height={'20%'} width={'100%'} style={styles.vector1} />
      <Vector5 height={'20%'} width={'100%'} style={styles.vector2} />
    </>
  );
};

const styles = StyleSheet.create({
  vector1: {
    position: 'absolute',
    top: '100%',
    zIndex: -1,
    left: '-40%',
    opacity: 0.9,
  },
  vector2: {
    position: 'absolute',
    top: '-10%',
    zIndex: -1,
    right: '-35%',
    opacity: 0.9,
  },
});

export default BackgroundVector1;
