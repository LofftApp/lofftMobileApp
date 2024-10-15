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
  city: z.object({
    name: z.string(),
    flag: z.string(),
  }),
  districts: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        toggle: z.boolean(),
        emoji: z.string().optional(),
      }),
    )
    .nonempty({
      message: 'Choose at least one district',
    }),
});

export const budgetSchema = z
  .object({
    minPrice: z
      .number()
      .nonnegative({message: 'Minimum price must be non-negative'})
      .gte(100, {message: 'Minimum price must be at least 100'}),
    maxPrice: z
      .number()
      .nonnegative({message: 'Maximum price must be non-negative'})
      .lte(5000, {message: 'Maximum price must be at most 5000'}),
    warmRent: z.boolean(),
  })
  .refine(data => data.minPrice <= data.maxPrice, {
    message: 'Minimum price must be less than or equal to maximum price',
    path: ['maxPrice'], // The error will be attached to the maxPrice field
  });
// Main schema (combining the individual schemas if needed)
export const newUserSchema = z.object({
  renter: z.object({
    languages: languagesSchema,
    characteristics: characteristicsSchema,
    genderIdentity: genderIdentitySchema,
  }),
});
