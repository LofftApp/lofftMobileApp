import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet,Button} from 'react-native';
import { getSpecificUserProfile } from '@Redux/user/usersMiddleware';

const ApplicantProfileScreen = ({route}:any) => {

  const { userId } = route.params
  const [profileDetails, setProfileDetails] = useState({})
  const [profileChars, setProfileCharts] = useState([])



  useEffect(() => {
      const apiCallToRetriveUser = getSpecificUserProfile(userId)

        apiCallToRetriveUser.then((result:any) => {
          setProfileDetails(result.data.profile_details)
          setProfileCharts(result.data.profile_characteristics)
    })

  },[])



  return (
    <View style={styles.container}>
      <Text>You ve made it</Text>
      <Button title="Make Api Call">
      </Button>
     {profileChars.map(el => <Text>{el.name}</Text>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ApplicantProfileScreen;
