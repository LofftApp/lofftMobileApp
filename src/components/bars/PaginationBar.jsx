import React from 'react';
import {View, StyleSheet} from 'react-native';

// Assets 🖼
import * as color from '../../styles/lofftColorPallet.json';

const createArrayWithTarget = target => {
  let i = 0;
  let response = [];
  while (i < target) {
    response.push(i);
    i++;
  }
  return response;
};

const PaginationBar = ({screen, totalScreens}) => {
  const blobs = createArrayWithTarget(totalScreens);
  return (
    <View style={styles.pagination}>
      {blobs.map((i, index) => {
        const active =
          index === screen
            ? {width: 18, backgroundColor: color.Lavendar[50]}
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
