export const createNativeStackNavigator = jest.fn(() => {
  return {
    Navigator: jest.fn().mockImplementation(({children}) => children),
    Screen: jest.fn().mockImplementation(({children}) => children),
  };
});
