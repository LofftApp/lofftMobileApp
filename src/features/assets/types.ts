import {
  addressSchema,
  characteristicSchema,
  citySchema,
  districtSchema,
  featureSchema,
} from 'lib/zodSchema';
import {z} from 'zod';

type Characteristic = z.infer<typeof characteristicSchema>;
type Feature = z.infer<typeof featureSchema>;
type Currency = z.infer<typeof addressSchema.shape.currency>;
type District = z.infer<typeof districtSchema>;
type City = z.infer<typeof citySchema>;
type CityAssets = City & {districts: District[]};

interface SafeSpace {
  id: number;
  emoji: string;
  name: string;
  toggle: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Language {
  id: number;
  name: string;
  toggle: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Assets {
  characteristics: Characteristic[];
  cities: CityAssets[];
  features: Feature[];
  safeSpaces: SafeSpace[];
  languages: Language[];
}

export type {
  Assets,
  Characteristic,
  CityAssets,
  SafeSpace,
  City,
  Currency,
  District,
  Feature,
  Language,
};
