export type District = {
  id: number;
  name: string;
  toggle: boolean;
  emoji?: string; // optional, since not all districts have emojis
};

export type SingleCity = {
  city: string;
  flag: string;
};

export type City = {
  districts: District[];
  flag: string;
};

export type Cities = {
  [key: string]: City;
};
