export type District = {
  id: number;
  name: string;
  toggle: boolean;
  emoji?: string;
};

export type SingleCity = {
  name: string;
  flag: string;
};

export type City = {
  districts: District[];
  flag: string;
};

export type Cities = {
  [key: string]: City;
};

// Flat Feature Screen

export type FlatFeature = {
  id: number;
  value: string;
  toggle: boolean;
  emoji?: string;
};
