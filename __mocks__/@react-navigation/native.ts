const navigateMock = jest.fn();

export const useNavigation = jest.fn(() => ({
  navigate: navigateMock,
  goBack: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
}));

export const mockedNavigation = { navigate: navigateMock };
