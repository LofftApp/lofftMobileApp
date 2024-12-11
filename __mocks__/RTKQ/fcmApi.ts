export const useRegisterTokenMutation = jest.fn(() => [
  jest.fn(() => ({
    unwrap: jest.fn(() => Promise.resolve('Mocked response')),
  })),
  {isLoading: false, isError: false},
]);

export const useGetNotificationsQuery = jest.fn(() => ({
  data: undefined,
  isLoading: false,
  isError: false,
  refetch: jest.fn(),
}));

export const useMarkAsReadMutation = jest.fn(() => [
  jest.fn(() => ({
    unwrap: jest.fn(() => Promise.resolve('Mocked response')),
  })),
  {isLoading: false, isError: false},
]);
