const messaging = jest.fn(() => ({
  requestPermission: jest.fn(() => Promise.resolve('authorized')),
  getToken: jest.fn(() => Promise.resolve('mock-fcm-token')),
  onMessage: jest.fn(() => jest.fn()),
  setBackgroundMessageHandler: jest.fn(),
  onTokenRefresh: jest.fn(() => jest.fn()),
  registerDeviceForRemoteMessages: jest.fn(() => Promise.resolve()),
})) as any;

messaging.AuthorizationStatus = {
  AUTHORIZED: 'authorized',
  PROVISIONAL: 'provisional',
};

export default messaging;
