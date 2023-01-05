import {relative} from 'node:path/win32';
import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const TestMapScreen = () => {
  // States
  const [flats] = useState([
    {
      address: 'Suarezstr 20, Berlin',
      icon: '🐿',
      price: 600,
      match: 88,
      name: 'Flash Boyz',
      district: 'Mitte',
      id: 1,
    },
    {
      address: 'Rudi Duschke Str 2, Berlin',
      icon: '🦄',
      price: 900,
      match: 92,
      name: 'Unicorns',
      district: 'Xberg',
      id: 2,
    },
    {
      address: 'Schlegelstr 14, Berlin',
      icon: '🐝',
      price: 900,
      match: 92,
      name: 'Unicorns',
      district: 'Xberg',
      id: 3,
    },

    {
      address: 'Wilsnackerstr 13, Berlin',
      icon: '⚛️',
      price: 900,
      match: 92,
      name: 'Reactive Gang',
      district: 'Moabit',
      id: 3,
    },
  ]);

  return (
    <View style={styles.bigBoi}>
      <SafeAreaView style={styles.container}>
        <ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}>
          {flats.map((el, index) => {
            return (
              <View style={styles.flatcard} key={index + 1}>
                <Text style={{padding: 10}}>{el.name}</Text>
                <Text style={{ padding: 10 }}>{el.icon}</Text>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  bigBoi: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'lightblue',
  },
  container: {
    minWidth: '100%',
    bottom: 20,
    position: 'absolute',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    zIndex: 1000000,
  },
  flatcard: {
    height: 200,
    width: 200,
    borderRadius: 12,
    backgroundColor: 'white',
    zIndex: 10000,
    marginHorizontal: 20,
  },
});

export default TestMapScreen;
