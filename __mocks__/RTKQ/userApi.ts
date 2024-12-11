export const useGetUserQuery = jest.fn(() => ({
  data: {
    id: '123',
    name: 'Mocked User',
    email: 'mocked@example.com',
    userType: 'admin',
  },
  isLoading: false,
  isError: false,
}));
