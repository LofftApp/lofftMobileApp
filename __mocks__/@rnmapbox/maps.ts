const MapboxGL = {
  MapView: jest.fn().mockImplementation(() => null),
  Camera: jest.fn().mockImplementation(() => null),
  UserLocation: jest.fn().mockImplementation(() => null),
  PointAnnotation: jest.fn().mockImplementation(() => null),
  MarkerView: jest.fn().mockImplementation(() => null),
  ShapeSource: jest.fn().mockImplementation(() => null),
  SymbolLayer: jest.fn().mockImplementation(() => null),
  CircleLayer: jest.fn().mockImplementation(() => null),
  LineLayer: jest.fn().mockImplementation(() => null),
  FillLayer: jest.fn().mockImplementation(() => null),
  BackgroundLayer: jest.fn().mockImplementation(() => null),
  VectorSource: jest.fn().mockImplementation(() => null),
  RasterSource: jest.fn().mockImplementation(() => null),
  RasterLayer: jest.fn().mockImplementation(() => null),
  Images: jest.fn().mockImplementation(() => null),
  Light: jest.fn().mockImplementation(() => null),
  Terrain: jest.fn().mockImplementation(() => null),
  Logger: {
    logLevel: jest.fn(),
  },
  setAccessToken: jest.fn(),
  getAccessToken: jest.fn(),
  requestAndroidLocationPermissions: jest.fn().mockResolvedValue(true),
};

export default MapboxGL;
