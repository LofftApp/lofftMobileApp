/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Mock the async thunk
jest.mock('../src/features/authentication/authenticationSlice', () => ({
  checkToken: {
    pending: 'checkToken/pending',
    fulfilled: 'checkToken/fulfilled',
    rejected: 'checkToken/rejected',
  },
}));

// Create mock store
const mockStore = configureStore([thunk]);
const store = mockStore({
  authentication: {loading: false},
});

test('renders correctly', () => {
  const {toJSON} = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(toJSON()).toMatchSnapshot();
});
