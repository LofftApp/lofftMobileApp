const notifee = {
  displayNotification: jest.fn(() => Promise.resolve()),
  createChannel: jest.fn(() => Promise.resolve('mock-channel-id')),
  onBackgroundEvent: jest.fn(() => Promise.resolve()),
};

export default notifee;
