interface Characteristics {
  id: number;
  emoji: string;
  name: string;
  toggle: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Features {
  id: number;
  emoji: string;
  name: string;
  toggle: boolean;
  createdAt: string;
  updatedAt: string;
}

interface District {
  id: number;
  name: string;
  toggle: boolean;
  emoji?: string;
}

interface City {
  districts: District[];
  flag: string;
}

interface Gender {
  id: number;
  emoji: string;
  name: string;
  toggle: boolean;
}

interface Language {
  [key: string]: {
    name: string;
    nativeName: string;
  };
}

interface Assets {
  characteristics: Characteristics[];
  cities: City[];
  features: Features[];
  genders: Gender[];
  languages: Language[];
}

export type {
  Characteristics,
  Features,
  District,
  City,
  Gender,
  Language,
  Assets,
};
