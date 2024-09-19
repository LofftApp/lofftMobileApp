const Collapsible = jest.mock('react-native-collapsible', () => {
  const actualCollapsible = jest.requireActual('react-native-collapsible');
  return {
    ...actualCollapsible,
    someOtherFunction: jest.fn(), // Mock specific functions if needed
  };
});

export default Collapsible;
