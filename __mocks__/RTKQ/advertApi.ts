export const useGetFavoritesAdvertsQuery = jest.fn();

export const useToggleFavoriteMutation = jest.fn(() => [
  jest.fn(() => ({
    unwrap: jest.fn(() => Promise.resolve('Mocked response')),
  })),
  {isLoading: false, isError: false},
]);

export const useApplyForFlatMutation = jest.fn(() => [
  jest.fn(() => ({
    unwrap: jest.fn(() => Promise.resolve('Mocked response')),
  })),
  {isLoading: false, isError: false},
]);
