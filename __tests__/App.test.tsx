/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
// import {it} from '@jest/globals'; // Commented out as currently not used

// Note: test renderer must be required after react-native.
import {createMockStore, defaultMockState} from '../__mocks__/reduxMock';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';

// // Mock the async thunk
// jest.mock('../src/features/auth/authSlice', () => ({
//   checkToken: {
//     pending: 'checkToken/pending',
//     fulfilled: 'checkToken/fulfilled',
//     rejected: 'checkToken/rejected',
//   },
// }));

// // Create mock store
// const store = createMockStore(defaultMockState);

// test('renders correctly', () => {
//   const {toJSON} = render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//   );
//   expect(toJSON()).toMatchSnapshot();
// });
