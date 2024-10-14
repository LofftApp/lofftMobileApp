import { z } from 'zod';

// Schema for languages
export const languagesSchema = z
  .array(z.string())
  .nonempty({
    message: 'Please select at least one language',
  })
  .max(5, {
    message: 'You can select up to 5 languages only',
  });

// Schema for characteristics
export const characteristicsSchema = z.array(
  z.object({
    id: z.number(),
    toggle: z.boolean(),
    value: z.string(),
    emoji: z.string(),
  }),
);

// Schema for gender identity
export const genderIdentitySchema = z.array(
  z.object({
    id: z.number(),
    toggle: z.boolean(),
    value: z.string(),
    emoji: z.string(),
  }),
);

// Main schema (combining the individual schemas if needed)
export const newUserSchema = z.object({
  renter: z.object({
    languages: languagesSchema,
    characteristics: characteristicsSchema,
    genderIdentity: genderIdentitySchema,
  }),
});
