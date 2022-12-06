import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Screens
import ScreenBackButton from '../../components/coreComponents/CoreScreens/ScreenBackButton';

const GenderIdentityScreen = () => {
  const genders = [
    {value: 'Male', id: 1, toggle: false},
    {value: 'Female', id: 2, toggle: false},
    {value: 'Non-Binary', id: 3, toggle: false},
    {value: 'Another gender identity not listed', id: 4, toggle: false},
    {value: 'Prefer not to say', id: 5, toggle: false},
  ];
  return <ScreenBackButton></ScreenBackButton>;
};

const styles = StyleSheet.create({});

export default GenderIdentityScreen;
