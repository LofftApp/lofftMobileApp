import {
  addressSchema,
  characteristicSchema,
  citySchema,
  districtSchema,
  featureSchema,
  genderIdentitySchema,
  languageSchema,
  safeSpaceSchema,
} from 'lib/zodSchema';
import {z} from 'zod';

type Language = z.infer<typeof languageSchema>;
type Characteristic = z.infer<typeof characteristicSchema>;
type Feature = z.infer<typeof featureSchema>;
type Currency = z.infer<typeof addressSchema.shape.currency>;
type District = z.infer<typeof districtSchema>;
type SafeSpace = z.infer<typeof safeSpaceSchema>;
type Gender = z.infer<typeof genderIdentitySchema>;
type City = z.infer<typeof citySchema>;
type CityAssets = City & {districts: District[]};

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
  Gender,
};
