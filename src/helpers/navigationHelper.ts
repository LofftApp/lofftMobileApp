export const navigationHelper = (navigation: any, targetScreen: any) =>
  navigation.navigate(targetScreen.screenName, {
    headerText: targetScreen?.headerText,
    subText: targetScreen?.subHeaderText,
  });
