import {
  initialMaxPrice,
  initialMinPrice,
  MAX_DESCRIPTION_CHARS,
  MAX_LANGUAGES,
  MAX_SELECTED_CHARS,
  MIN_DESCRIPTION_CHARS,
  MIN_SELECTED_CHARS,
  MIN_SELECTED_FEATURES,
} from 'components/componentData/constants';
import {z} from 'zod';

const languagesSchema = z
  .array(z.string())
  .nonempty({
    message: 'Please select at least one language',
  })
  .max(MAX_LANGUAGES, {
    message: `You can select up to ${MAX_LANGUAGES} languages only`,
  });

const characteristicsSchema = z
  .array(
    z.object({
      id: z.number(),
      toggle: z.boolean(),
      value: z.string(),
      emoji: z.string(),
    }),
  )
  .min(MIN_SELECTED_CHARS, {
    message: `Please select at least ${MIN_SELECTED_CHARS} tags`,
  })
  .max(MAX_SELECTED_CHARS, {
    message: `You can select up to ${MAX_SELECTED_CHARS} tags only`,
  });

const genderIdentitySchema = z
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
  .max(MIN_SELECTED_FEATURES, {
    message: 'You can select up to 3 options only',
  });

const cityDistrictsSchema = z.object({
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

const budgetSchema = z
  .object({
    minPrice: z
      .number()
      .nonnegative({message: 'Minimum price must be non-negative'})
      .gte(+initialMinPrice, {
        message: `Minimum price must be at least ${initialMinPrice}`,
      }),
    maxPrice: z
      .number()
      .nonnegative({message: 'Maximum price must be non-negative'})
      .lte(+initialMaxPrice, {
        message: `Maximum price must be at most ${initialMaxPrice}`,
      }),
    warmRent: z.boolean(),
  })
  .refine(data => data.minPrice <= data.maxPrice, {
    message: 'Minimum price must be less than or equal to maximum price',
    path: ['maxPrice'],
  });

const featuresSchema = z
  .array(
    z.object({
      id: z.number(),
      toggle: z.boolean(),
      value: z.string(),
      emoji: z.string(),
    }),
  )
  .nonempty({
    message: 'Please select at least one tag',
  });

const descriptionSchema = z
  .string({
    required_error: `We need at least ${MIN_DESCRIPTION_CHARS} words to create your profile`,
  })
  .min(MIN_DESCRIPTION_CHARS, {
    message: 'We are sure you have more to say about yourself',
  })
  .max(MAX_DESCRIPTION_CHARS, {
    message: `That is great but we need to keep it less than ${MAX_DESCRIPTION_CHARS} words`,
  });

const nameSchema = z.object({
  firstName: z
    .string({required_error: 'Please enter your first name'})
    .min(1, 'Please enter your first name'),
  lastName: z
    .string({required_error: 'Please enter your last name'})
    .min(1, 'Please enter your last name'),
  dateOfBirth: z.date({required_error: 'Please enter your date of birth'}),
});

const addressSchema = z.object({
  address: z
    .string({required_error: 'Please enter your address'})
    .min(1, 'Please enter your address'),
  district: z.string().optional(),
  price: z
    .number({
      required_error: 'Please enter a price',
      invalid_type_error: 'Price must be a number',
    })
    .positive('Please enter a valid price'),
  warmRent: z.boolean(),
});

const dateLengthSchema = z.object({
  fromDate: z.date({required_error: 'Please enter a date'}),
  untilDate: z.date().optional(),
  permanent: z.boolean(),
});

// Main schema (combining the individual schemas if needed)
const newUserSchema = z.object({
  renter: z.object({
    languages: languagesSchema,
    characteristics: characteristicsSchema,
    genderIdentity: genderIdentitySchema,
  }),
});

export {
  languagesSchema,
  characteristicsSchema,
  genderIdentitySchema,
  cityDistrictsSchema,
  budgetSchema,
  newUserSchema,
  featuresSchema,
  descriptionSchema,
  nameSchema,
  addressSchema,
};
