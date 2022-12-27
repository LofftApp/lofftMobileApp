import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Color from '../../styles/lofftColorPallet.json';

const ListChips = ({list}) => {
  return Object.entries(list).map(([key, value]) => {
    return key === 'flatProperties' ? (
      value.slice(0, 2).map((item, index) => {
        return (
          <View style={styles.chipsWrap}>
            <View style={styles.chip}>
              <Text style={styles.chipFont}>{item}</Text>
            </View>
            {value.length > 2 ? (
              <View style={styles.chip}>
                <Text style={styles.chipFont}>
                  +{value.slice(1, -1).length}
                </Text>
              </View>
            ) : null}
          </View>
        );
      })
    ) : (
      <View>
        <Text>{value}</Text>
      </View>
    );
  });
};

const Chip = ({flatData}) => {
  const flatInfo = {
    flatProperties: [
      'Close to U- & S-Bahn',
      '2 bathrooms',
      'Fully furnished',
      'Balcony',
      'toilet',
    ],
    flatPersonalities: [
      'Chill & relax',
      'Climate crisis',
      'Chatty',
      'Party',
      'Happy',
      'sad',
    ],
  };
  return (
    <View style={styles.chipContainer}>
      <ListChips list={flatInfo} />
    </View>
  );
};

// <View
//   style={
//     styles.chip
//     // : [styles.chip, {backgroundColor: Color.Lavendar[50]}]
//   }>
//   <Text style={styles.chipFont}>{value}</Text>
// </View>;
// value.slice(0, 2).map((item, index) => {
//   return (
//     <View
//       style={
//         value.length > 5
//           ? styles.chip
//           : [styles.chip, {backgroundColor: Color.Lavendar[50]}]
//       }>
//       <Text style={styles.chipFont}>{item}</Text>
//     </View>
//   );
// });

// value.length > 2 ? (
//   <View style={styles.chip}>
//     <Text style={styles.chipFont}>+{value.slice(1, -1).length}</Text>
//   </View>
// ) : null;
// })}
// ;

// 1. list all the properties user selected.
// 2. If the list has more than 2 properties, 3rd chip doesn't display the value.
// 3. 3rd chip dis play "+{the number of the rest}"

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'column',
  },
  chipsWrap: {
    flexDirection: 'row',
    borderWidth: 1,
  },
  chip: {
    height: 'auto',
    width: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginRight: 4,
    backgroundColor: Color.Blue[10],
  },
  chipFont: {
    fontSize: 14,
    color: Color.Blue[100],
  },
});

export default Chip;
