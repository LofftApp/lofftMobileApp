import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import SignInForm from '../components/SignInForm';
import SignInWith from '../components/SignInWith';
import Color from '../styles/lofftColorPallet.json';
// import {SvgXml} from 'react-native-svg';
import BackgroundImage from '../assets/background/signin.svg';

// const xml = `
// <svg width="414" height="896" viewBox="0 0 414 896" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g clip-path="url(#clip0_504_4293)">
// <path d="M274.115 171.152C283.244 178.338 281.453 192.584 270.835 197.417C268.832 198.305 266.631 198.891 264.481 199.228C252.65 201.368 241.618 205.439 230.935 211.092C222.468 215.588 214.895 220.789 208.242 227.583C205.489 230.344 202.556 232.965 198.921 234.452C191.402 237.376 184.657 232.501 185.073 224.422C185.281 221.396 186.307 218.435 187.602 215.685C192.306 205.472 199.089 197.04 208.428 190.331C224.137 179.214 241.717 172.902 260.075 168.363C265.296 167.255 269.984 168.481 274.115 171.152Z" fill="#B7EFDD"/>
// <path fill-rule="evenodd" clip-rule="evenodd" d="M354.995 125.821C352.675 131.762 351.839 138.074 352.025 143.458C352.303 178.452 380.243 202.772 413.567 197.76C446.334 192.84 470.19 159.516 464.249 126.657C458.308 93.4258 427.398 74.6754 395.095 84.7004C374.21 91.1052 362.7 106.607 354.995 125.821ZM378.665 143.922C378.48 159.145 390.083 170.655 404.378 170.748C424.613 170.841 441.414 149.584 436.866 129.627C433.339 114.125 419.137 104.936 404.006 109.856C386.741 115.425 378.851 125.171 378.665 143.922Z" fill="#B7EFDD"/>
// <path fill-rule="evenodd" clip-rule="evenodd" d="M-18.363 165.018C-15.8094 167.926 -13.2443 170.847 -8.86063 171.094C-6.64349 171.027 -4.74303 170.073 -2.7413 169.068C-2.61959 169.007 -2.49751 168.946 -2.37497 168.885C6.3201 164.181 15.229 159.762 24.2804 155.842C28.2716 154.132 31.9777 151.708 35.4699 149.214C40.3876 145.65 41.2429 141.944 38.3208 136.599C32.9042 126.55 27.4163 116.501 21.9284 106.451C21.1587 105.054 20.4346 103.635 19.7105 102.215C18.6243 100.085 17.5381 97.9558 16.298 95.9032C13.661 91.4131 9.66983 90.059 4.68086 91.6269C1.11731 92.7673 -2.01862 94.5491 -4.94073 96.7585C-10.8562 101.177 -17.3419 104.456 -23.8988 107.663C-27.0348 109.16 -30.0281 110.941 -32.9503 112.794C-35.2309 114.149 -37.1552 115.859 -38.7945 117.926C-40.5762 120.207 -41.574 122.772 -40.6475 125.694C-39.3646 129.828 -38.0818 133.891 -35.2309 137.383C-29.458 144.367 -24.9679 152.207 -21.2618 160.475C-21.146 160.723 -21.034 160.983 -20.9205 161.246C-20.5452 162.116 -20.1533 163.025 -19.5513 163.682C-19.151 164.12 -18.7572 164.569 -18.363 165.018ZM-7.80374 148.966C-7.32417 150.046 -6.8173 151.187 -5.58251 152.207C2.18604 147.575 10.4535 143.583 19.006 140.448C20.859 139.806 20.6452 138.594 19.79 137.169L19.7899 137.169C15.2286 129.187 10.6673 121.204 6.24847 113.151C5.03686 110.87 3.89654 111.155 2.25731 112.509C-3.7486 117.355 -10.7348 120.501 -17.7001 123.638C-18.0085 123.777 -18.3169 123.916 -18.6251 124.055C-22.9727 126.051 -23.0439 126.122 -20.0505 129.614C-15.3467 135.173 -11.6406 141.445 -8.29082 147.931C-8.11497 148.265 -7.96082 148.612 -7.80374 148.966Z" fill="#B7EFDD"/>
// </g>
// <defs>
// <clipPath id="clip0_504_4293">
// <rect width="414" height="896" fill="white"/>
// </clipPath>
// </defs>
// </svg>
// `;

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={require('../assets/ilustration/Hi-five.png')}
        />
        <View>
          <BackgroundImage size={30} />
        </View>
      </View>
      {/* <SvgXml width="100%" xml={xml} style={styles.backgroundImage} /> */}
      <View style={styles.formWrap}>
        <View style={styles.signInForm}>
          <SignInForm />
        </View>
        <View style={styles.signInWith}>
          <SignInWith />
          <Text style={styles.text}>
            Don't have an account yet? <Text>Sign Up</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Lavendar['5'],
  },
  image: {
    height: '70%',
    overflow: 'visible',
    marginTop: 50,
  },
  backgroundImage: {
    position: 'absolute',
    top: -70,
  },
  imageWrap: {
    zIndex: 2,
    flex: 1,
    alignItems: 'center',
  },
  formWrap: {
    zIndex: 1,
    flex: 4,
    paddingHorizontal: 10,
    backgroundColor: Color.White['100'],
    borderRadius: 30,
  },
  signInForm: {
    flex: 2,
  },
  signInWith: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    paddingBottom: 40,
    fontSize: 16,
  },
});

export default SignInScreen;
