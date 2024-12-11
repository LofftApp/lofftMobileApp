export const useSignOutMutation = jest.fn(() => [
  jest.fn(() => ({
    unwrap: jest.fn(() => Promise.resolve('Mocked response')),
  })),
  {isLoading: false, isError: false},
]);
