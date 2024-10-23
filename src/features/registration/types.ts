import {characteristicSchema, featureSchema} from 'lib/zodSchema';
import {z} from 'zod';

type Characteristic = z.infer<typeof characteristicSchema>;
type Feature = z.infer<typeof featureSchema>;

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
  characteristics: Characteristic[];
  cities: City[];
  features: Feature[];
  genders: Gender[];
  languages: Language[];
}

export type {Characteristic, Feature, District, City, Gender, Language, Assets};
