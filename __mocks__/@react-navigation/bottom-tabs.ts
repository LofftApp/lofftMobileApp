export const createBottomTabNavigator = jest.fn(() => {
  return {
    Navigator: jest.fn().mockImplementation(({children}) => children),
    Screen: jest.fn().mockImplementation(({children}) => children),
  };
});
