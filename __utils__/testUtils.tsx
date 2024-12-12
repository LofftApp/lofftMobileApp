import React, {PropsWithChildren} from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {
  RootState,
  setupStoreForTesting,
  AppStoreForTesting,
} from '../src/app/store';
import {RenderOptions} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStoreForTesting;
  navigation?: boolean;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStoreForTesting(preloadedState),
    navigation = false,
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
    const content = <Provider store={store}>{children}</Provider>;
    return navigation ? (
      <NavigationContainer>{content}</NavigationContainer>
    ) : (
      content
    );
  }

  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}


export const findStyleInArray = (styles: any[], styleName: string) => {
  const styleObject = styles.find((style: any) =>
    style.hasOwnProperty(styleName),
  );
  return styleObject ? styleObject[styleName] : null;
};
