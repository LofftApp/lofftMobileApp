const SplashScreen = {
  show: jest.fn().mockImplementation(() => {
    console.log('show splash screen');
  }),
  hide: jest.fn().mockImplementation(() => {
    console.log('hide splash screen');
  }),
};

export default SplashScreen;
