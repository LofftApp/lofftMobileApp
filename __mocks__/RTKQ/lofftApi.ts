export const lofftApi = {
  reducerPath: 'lofftApi',
  reducer: jest.fn((state = {queries: {}, mutations: {}}) => state),
  middleware: jest.fn(() => (next: any) => (action: any) => next(action)),
  injectEndpoints: jest.fn(() => ({
    useGetSomeDataQuery: jest.fn(() => ({
      data: {key: 'mockedValue'},
      isLoading: false,
    })),
  })),
};
