import {z} from 'zod';

export const languagesSchema = z
  .array(z.string())
  .nonempty({
    message: 'Please select at least one language',
  })
  .max(5, {
    message: 'You can select up to 5 languages only',
  });

export const characteristicsSchema = z
  .array(
    z.object({
      id: z.number(),
      toggle: z.boolean(),
      value: z.string(),
      emoji: z.string(),
    }),
  )
  .min(3, {
    message: 'Please select at least 3 tags',
  })
  .max(10, {
    message: 'You can select up to 10 tags only',
  });

export const genderIdentitySchema = z
  .array(
    z.object({
      id: z.number(),
      toggle: z.boolean(),
      value: z.string(),
      emoji: z.string(),
    }),
  )
  .nonempty({
    message: 'Please select at least one option',
  })
  .max(3, {
    message: 'You can select up to 3 options only',
  });

export const cityDistrictsSchema = z.object({
  city: z.string({required_error: 'Choose a city'}).min(1, 'Choose a city'),
  districts: z.array(z.string()).nonempty({
    message: 'Choose at least one district',
  }),
});

// Main schema (combining the individual schemas if needed)
export const newUserSchema = z.object({
  renter: z.object({
    languages: languagesSchema,
    characteristics: characteristicsSchema,
    genderIdentity: genderIdentitySchema,
  }),
});
