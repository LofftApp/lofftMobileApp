import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Redux 📦
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';
import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Components 🪢
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import Divider from 'components/bars/Divider';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

// StylesSheet 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import Color from 'styleSheets/lofftColorPallet.json';

//Assets 🎨
import {RegistrationBackground} from 'assets';

// Data 💿
import {newUserScreens} from 'navigationStacks/newUserScreens';

// Validation 🛡  ️
import {characteristicsSchema} from 'lib/zodSchema';

// Constants 📊
import {
  MAX_SELECTED_CHARS,
  MIN_SELECTED_CHARS,
} from 'components/componentData/constants';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';
import {isEqualValue} from 'helpers/isEqualValue';

// Types 🏷 ️
import {
  NewUserJourneyStackNavigation,
  SettingsScreenNavigationProp,
} from '../../../navigationStacks/types';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {CoreButton} from 'components/buttons/CoreButton';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import Popover, {
  PopoverMode,
  PopoverPlacement,
  Rect,
} from 'react-native-popover-view';

const AboutUserFlatScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;

  //Safe Area
  const insets = useSafeAreaInsets();
  const {height, width} = useWindowDimensions();

  //Navigation
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

  // initial state
  const {data} = useGetAssetsQuery();
  const characteristics = data?.characteristics;

  // Local State
  const [selectedCharsIds, setSelectedCharsIds] = useState<number[]>([]);
  const [error, setError] = useState<string | undefined>('');
  const [showPopover, setShowPopover] = useState(false);
  const [firstAttempt, setFirstAttempt] = useState(true);

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {newUserDetails, setNewUserDetails, isNewUserLessor} =
    useNewUserDetails(isLessor, edit);

  const {
    data: advert,
    isLoading,
    isError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit || !advertId,
    refetchOnMountOrArgChange: true,
  });
  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});
  console.log('currentUser', currentUser);

  const savedCharsIds = useMemo(() => {
    if (edit) {
      return isLessor
        ? advert?.flat?.characteristics.map(char => char.id)
        : currentUser?.profile?.characteristics.map(char => char.id);
    }
    return newUserDetails?.characteristics;
  }, [
    edit,
    isLessor,
    advert?.flat.characteristics,
    currentUser?.profile.characteristics,
    newUserDetails.characteristics,
  ]);

  useEffect(() => {
    if (savedCharsIds && savedCharsIds.length > 0) {
      setSelectedCharsIds(savedCharsIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackButton = () => {
    if (!edit) {
      const previousScreen = currentScreen - 1;
      setCurrentScreen(previousScreen);
    }
    if (!isEqualValue(savedCharsIds, selectedCharsIds) && firstAttempt) {
      setShowPopover(true);
      setFirstAttempt(false);
      return;
    }

    navigation.goBack();
    setError('');
  };

  const handleSelectChars = (id: number) => {
    setSelectedCharsIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(charId => charId !== id)
        : [...prevIds, id],
    );
  };

  const handleContinue = async () => {
    const selectedChars = characteristics?.filter(chars =>
      selectedCharsIds.includes(chars.id),
    );
    console.log('selectedChars', selectedChars);
    const result = characteristicsSchema.safeParse(selectedChars);
    if (!result.success) {
      setError(result.error?.flatten().formErrors.at(0));
      return;
    }

    setNewUserDetails({characteristics: selectedCharsIds});
    if (edit) {
      navigation.navigate('NewUserNavigator', {
        screen: 'FlatFeaturesScreen',
        params: {
          edit: true,
          advertId,
          newValue: !isEqualValue(savedCharsIds, selectedCharsIds),
        },
      });
    } else {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);

      setCurrentScreen(currentScreen + 1);
    }

    setError('');
    setShowPopover(false);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return (
      <NotFoundComponent
        message="We couldn't retrieve the advert details"
        backButton
        onPress={handleBackButton}
      />
    );
  }

  const charsButtons = characteristics?.map(char => {
    return (
      <SelectionButton
        key={char.id}
        id={char.id}
        emojiIcon={char.emoji}
        value={char.name}
        toggle={selectedCharsIds.includes(char.id)}
        selectFn={handleSelectChars}
        disabled={
          selectedCharsIds.length === MAX_SELECTED_CHARS &&
          !selectedCharsIds.includes(char.id)
        }
      />
    );
  });
  return (
    <View
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        {
          paddingTop: insets.top,
        },
      ]}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={CoreStyleSheet.screenContainer}>
        <HeadlineContainer
          headlineText={
            isNewUserLessor || isLessor
              ? 'Tell us a bit about your flat'
              : 'Tell us a bit about yourself'
          }
          subDescription={
            isNewUserLessor || isLessor
              ? `Select at least ${MIN_SELECTED_CHARS} tags that describe your Lofft lifestyles. More tags selected, more likelihood you'll find the right crowd!`
              : `Select at least ${MIN_SELECTED_CHARS} tags that describe who you are and your lifestyles. More tags selected, more likelihood you'll find the right crowd in a Lofft!`
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.selectionContainer}>{charsButtons}</View>
        </ScrollView>
        <Divider />
        <View style={[styles.footerContainer]}>
          <View style={styles.tagInfoContainer}>
            <Text
              style={
                fontStyles.bodySmall
              }>{`* Select at least ${MIN_SELECTED_CHARS} tags`}</Text>
          </View>
          {error ||
            (selectedCharsIds.length === MAX_SELECTED_CHARS && (
              <ErrorMessage
                message={
                  error ||
                  `You have selected maximum of ${MAX_SELECTED_CHARS} tags`
                }
              />
            ))}
          {!edit && <NewUserPaginationBar />}

          <NewUserJourneyContinueButton
            value="Continue"
            disabled={selectedCharsIds.length < MIN_SELECTED_CHARS}
            onPress={handleContinue}
          />
        </View>
      </View>
      <Popover
        mode={PopoverMode.RN_MODAL}
        popoverStyle={[
          styles.popoverContainer,
          {width: width * 0.95, height: height * 0.13},
        ]}
        // from={new Rect(width * 0.29, height * 0.25, 0, 0)}
        isVisible={showPopover}
        placement={PopoverPlacement.TOP}
        arrowSize={{width: 0, height: 0}}
        onRequestClose={() => setShowPopover(false)}>
        <View style={styles.popoverContent}>
          <View style={styles.popoverText}>
            <LofftIcon
              name="check-verified-02"
              size={25}
              color={Color.Lavendar[100]}
            />
            <Text style={fontStyles.bodyTiny}>
              Applied. You can find the listings in {'\n'}My Applications tab.
            </Text>
          </View>
          <View style={styles.popoverText}>
            <LofftIcon name="wallet" size={25} color={Color.Lavendar[100]} />
            <Text style={fontStyles.headerTiny}>Remaining Tokens</Text>
          </View>
        </View>
        <CoreButton
          value="Got it"
          onPress={() => setShowPopover(false)}
          style={styles.buttonStyle}
          textSize={fontStyles.bodyTiny}
        />
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    marginTop: size(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: size(10),
  },
  tagInfoContainer: {
    marginBottom: size(5),
  },
  footerContainer: {
    paddingTop: size(20),
  },
  popoverContainer: {
    backgroundColor: Color.Mint[20],
    paddingHorizontal: size(10),
    borderRadius: 12,
    borderColor: Color.Mint[20],

    flexDirection: 'row',
    alignItems: 'center',
  },
  popoverContent: {
    flex: 1,
    paddingHorizontal: size(8),
    justifyContent: 'center',
    gap: size(10),
  },
  popoverText: {flexDirection: 'row', alignItems: 'center', gap: size(5)},

  buttonStyle: {
    backgroundColor: Color.Lavendar[100],
    borderColor: Color.Lavendar[100],
    borderRadius: 12,
    borderWidth: 2,
    width: size(70),
    height: size(41),
  },
});

export default AboutUserFlatScreen;
