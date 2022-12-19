import React from 'react';
import {View, StyleSheet} from 'react-native';

// Assets 🖼
import * as color from '../../styles/lofftColorPallet.json';

const PaginationBar = ({screen}) => {
  const blobs = [1, 2, 3, 4, 5, 6];
  return (
    <View style={styles.pagination}>
      {blobs.map((i, index) => {
        const active =
          index === screen
            ? {width: 18, backgroundColor: color.Lavendar[80]}
            : null;
        return <View style={[styles.paginationBlob, active]} key={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationBlob: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: color.Black[10],
    marginHorizontal: 3,
  },
  active: {},
});

export default PaginationBar;
