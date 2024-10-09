import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Factory function to create a mock store with customizable state
export const createMockStore = (initialState = {}) => {
  const mockStore = configureStore([thunk]);
  return mockStore(initialState);
};

// Example of an initial state you can reuse in tests
export const defaultMockState = {
  auth: {
    isAuthenticated: false,
  },

};
