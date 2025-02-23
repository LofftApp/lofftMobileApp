import React from 'react';
import {View, Text, StyleSheet, Animated, FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Hooks 🪝
import {useSelectCityScreen} from './useSelectCityScreen';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import CustomSwitch from 'components/coreComponents/interactiveElements/CustomSwitch';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import Divider from 'components/bars/Divider';
import BackButton from 'components/buttons/BackButton';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import NewUserScreensPopover from 'components/modals/NewUserScreensPopover';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Assets
import {RegistrationBackground} from 'assets';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

// Types
import {CityAssets} from 'reduxFeatures/assets/types';

const SelectCityScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;

  const insets = useSafeAreaInsets();

  const {
    city,
    districts,
    selectedDistrictIds,
    selectFn,
    isQuery,
    dropdownContent,
    handleOnChangeSearch,
    handleClearSearch,
    formattedDropDownContent,
    handleDropDownPress,
    fadeAnim,
    isAllDistricts,
    selectAllDistrictsTags,
    error,
    handleContinue,
    handleBackButton,
    isAdvertLoading,
    isAdvertError,
    isEditLoading,
    isEditError,
    isLessor,
    isNewUserLessor,
    showPopover,
    setShowPopover,
  } = useSelectCityScreen(edit, advertId);

  if (isAdvertLoading) {
    return <LoadingComponent />;
  }

  if (isAdvertError) {
    return (
      <NotFoundComponent
        message="We couldn't retrieve the advert details"
        backButton
        onPress={handleBackButton}
      />
    );
  }

  return (
    <View
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        {
          paddingTop: insets.top,
          paddingBottom: !edit ? insets.bottom : undefined,
        },
      ]}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={styles.mainContainer}>
        <HeadlineContainer
          headlineText={
            isNewUserLessor || isLessor
              ? 'In which city and district is your flat located?'
              : 'Where are you looking for the flat?'
          }
        />
        <View style={styles.inputContainer}>
          <InputFieldText
            type="search"
            placeholder="Berlin for instance?"
            onChangeText={handleOnChangeSearch}
            onClear={handleClearSearch}
            value={city}
            dropdown={isQuery}
            dropDownContent={formattedDropDownContent(
              dropdownContent as CityAssets[],
            )}
            dropDownPressAction={handleDropDownPress}
          />
        </View>

        <View style={styles.resultWrapper}>
          <Animated.View
            style={[
              styles.districtTitleContainer,
              {
                opacity: fadeAnim,
              },
            ]}>
            <Text style={[fontStyles.headerMedium]}>Districts</Text>
            {(!isNewUserLessor || !isLessor) && (
              <View style={styles.switchContainer}>
                <Text style={fontStyles.bodySmall}>Select All</Text>
                <CustomSwitch
                  value={isAllDistricts}
                  onValueChange={selectAllDistrictsTags}
                />
              </View>
            )}
          </Animated.View>

          <FlatList
            data={districts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <SelectionButton
                key={item.id}
                id={item.id}
                value={item.name}
                emojiIcon={item.emoji}
                toggle={selectedDistrictIds.includes(item.id)}
                selectFn={selectFn}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.selectionContainer}
          />
        </View>

        <Divider />
      </View>

      <View style={styles.footerContainer}>
        {(error || isEditError) && <ErrorMessage message={error as string} />}
        {!edit && <NewUserPaginationBar />}

        <NewUserJourneyContinueButton
          value={
            edit ? (
              !isLessor ? (
                isEditLoading ? (
                  <LoadingButtonIcon />
                ) : (
                  'Save'
                )
              ) : (
                'Continue'
              )
            ) : (
              'Continue'
            )
          }
          onPress={handleContinue}
          disabled={isEditLoading}
        />
      </View>
      <NewUserScreensPopover
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        save={edit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: size(20),
    paddingHorizontal: size(16),
  },
  inputContainer: {
    paddingTop: size(10),
  },
  districtTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: size(10),
    paddingBottom: size(20),
  },

  resultWrapper: {
    marginTop: size(10),
    flex: 1,
    height: '100%',
  },

  selectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
    paddingHorizontal: size(10),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(16),
  },
  footerContainer: {
    paddingHorizontal: size(16),
    width: '100%',
    marginTop: 'auto',
  },
});

export default SelectCityScreen;
