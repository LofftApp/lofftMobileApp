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

interface Gender {
  id: number;
  emoji: string;
  name: string;
  toggle: boolean;
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
  genders: Gender[];
  languages: Language[];
}

export type {
  Assets,
  Characteristic,
  CityAssets,
  City,
  Currency,
  District,
  Feature,
  Language,
};
