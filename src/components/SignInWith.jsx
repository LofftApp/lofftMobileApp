import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const SignInWith = () => {
  return (
    <View>
      <Text>Or sign in with</Text>
      <Button title="Apple logo"></Button>
      <Button title="Google logo"></Button>
      <Text>
        Already have an account? <Text>Sign in</Text>
      </Text>
    </View>
  );
};

export default SignInWith;
