/* React Stuff */
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet,Button, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

/* Redux Api Calls etc */
import { getSpecificUserProfile } from '@Redux/user/usersMiddleware';

/* Components */
import LofftHeaderPhoto from '@Components/cards/LofftHeaderPhoto';
import HighlightButtons from '@Components/containers/HighlightButtons';
import LofftIcon from '@Components/lofftIcons/LofftIcon';

/* Styles */
import { fontStyles } from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';


const ApplicantProfileScreen = ({route}:any) => {

  const navigation = useNavigation()
  const { userId, firstName } = route.params
  const [profileDetails, setProfileDetails] = useState({})
  const [profileChars, setProfileCharts] = useState([])
  const images = ["https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4524.jpg.webp", "https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4286.jpg.webp", "https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-4203.jpg.webp","https://www.friendsoffriends.com/app/uploads/andreas-kokkino-david-daniels/Freunde-von-Freunden_Andreas-Kokkino-3849.jpg.webp"]


  useEffect(() => {
      const apiCallToRetriveUser = getSpecificUserProfile(userId)

        apiCallToRetriveUser.then((result:any) => {
          setProfileDetails(result.data.profile_details)
          setProfileCharts(result.data.profile_characteristics)
    })

  },[])

  const capitalize = word => {
    return word.charAt(0).toUpperCase() + word.substring(1)
  }

  console.log(profileDetails)


  return (
    <View style={styles.container}>
      <View>
      <LofftHeaderPhoto images={images} imageContainerHeight={400} />
        <HighlightButtons navigation={navigation} heartPresent={false} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.infoA}>
          <Text style={fontStyles.headerMedium}>{capitalize(firstName.split("@")[0])}</Text>
          <Text style={{color:Color.Black[80]}}>28 years old</Text>
        </View>

        <View style={styles.infoB}>
          <LofftIcon name="calendar" size={25} color={Color.Black[30]} />
          <Text style={[fontStyles.headerSmall, {color:Color.Black[100], paddingLeft:10,}]}>From: 25/12/22 - unlimited</Text>
        </View>

        <View style={styles.infoC}>
          <LofftIcon name="translate" size={25} color={Color.Black[30]} />
          <Text style={[fontStyles.headerSmall, { color: Color.Black[100], paddingLeft: 10, }]}>English, German, Arabic</Text>
        </View>

        <View>
          <Text style={[fontStyles.bodySmall,{color: Color.Black[80]}]}>{profileDetails.description}</Text>
        </View>


        {/* {profileChars.map((el, index) => <Text key={index}>{el.name}</Text>)} */}
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  userImage: {
    width: '100%',
    height: 400,
  },
  contentContainer: {
    padding: 12
  },
  infoA: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  infoB: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  infoC:{
    paddingBottom: 15,
    flexDirection: 'row'
  }
});

export default ApplicantProfileScreen;
