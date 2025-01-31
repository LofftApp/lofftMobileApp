import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
//Redux

//Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

//Components
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Helpers
import {size} from 'react-native-responsive-sizes';
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';
import { useNavigation } from '@react-navigation/native';

// Constants
// Types

const SettingsCard = ({
  settingsData: {title, icon, subtitle, id, navigate},

  selectApplication,
  application,
}: SettingsCardProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const hasArrowArr = [1, 2, 3, 4];
  const isDelete = id === 6;
  const hasArrow = hasArrowArr.includes(id);
  const navigation = useNavigation<SettingsScreenNavigationProp>();


  const toggleCollapsed = () => {
    setCollapsed(prev => !prev);
  };

  const handleNavigate = () => {
    // Ensure navigate is a function before calling
    if (typeof navigate === 'function') {
      navigate(navigation);
    } else {
      console.error('Navigate is not a function');
    }
  };
  // const handleOnPress = () => {
  //   signOut();
  // };

  const {width} = useWindowDimensions();

  return (
    <View style={[styles.outterContainer, {width: width - 30}]}>
      <Pressable onPress={handleNavigate}>
        <View style={[styles.innerContainer]}>
          <View style={styles.details}>
            <LofftIcon
              name={icon}
              size={25}
              color={isDelete ? Color.Tomato[100] : Color.Black[100]}
            />
            <View style={styles.titleContainer}>
              <Text
                style={[
                  fontStyles.headerSmall,
                  styles.nameMargin,
                  isDelete && {color: Color.Tomato[100]},
                ]}>
                {title}
              </Text>
              {subtitle && (
                <Text style={[fontStyles.bodySmall, styles.subtitle]}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
          {/* <SeeMoreButton
          collapsed={collapsed}
          toggleExpand={toggleCollapsed}
          noText
          iconSize={35}
        /> */}

          <View style={styles.iconContainer}>
            <LofftIcon
              name="chevron-right"
              size={35}
              color={hasArrow ? Color.Lavendar[80] : Color.White[80]}
            />
          </View>
        </View>
      </Pressable>

      {/* <Collapsible collapsed={!collapsed} duration={300}>
        <View style={styles.collapsedExpand}>
          <Text style={fontStyles.headerSmall}>Match with you</Text>
          <View style={styles.chipsContainer}>
            <Text>text 3</Text>
          </View>
        </View>
      </Collapsible> */}
    </View>
  );
};

const styles = StyleSheet.create({
  outterContainer: {
    backgroundColor: Color.White[100],
    borderRadius: 12,
    marginBottom: size(20),
    paddingHorizontal: size(5),
    height: 'auto',
  },

  innerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(30),
  },
  titleContainer: {
    alignItems: 'flex-start',
    gap: size(10),
  },
  subtitleContainer: {
    marginLeft: size(15),
  },
  subtitle: {
    color: Color.Black[50],
  },
  matcher: {
    color: Color.Mint[100],
  },
  collapsedExpand: {
    marginTop: size(10),
    gap: size(10),
    height: 'auto',
  },

  nameMargin: {
    marginRight: size(20),
  },
  chipsContainer: {
    flexWrap: 'wrap',
  },

  iconContainer: {
    padding: size(10),
  },
});

export default SettingsCard;
