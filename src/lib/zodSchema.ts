import {
  initialMaxPrice,
  initialMinPrice,
  MAX_DESCRIPTION_CHARS,
  MAX_FLAT_IMAGES,
  MAX_GENDERS,
  MAX_LANGUAGES,
  MAX_SELECTED_CHARS,
  MAX_TAGLINE,
  MAX_USER_IMAGES,
  MIN_DESCRIPTION_CHARS,
  MIN_SELECTED_CHARS,
  MIN_SELECTED_FEATURES,
} from 'components/componentData/constants';
import dayjs from 'dayjs';
import {z} from 'zod';

const languageSchema = z.object({
  id: z.number(),
  name: z.string(),
  toggle: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const languagesSchema = z
  .array(languageSchema)
  .nonempty({
    message: 'Please select at least one language',
  })
  .max(MAX_LANGUAGES, {
    message: `You can select up to ${MAX_LANGUAGES} languages only`,
  });

const characteristicSchema = z.object({
  id: z.number(),
  name: z.string(),
  emoji: z.string(),
  toggle: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const characteristicsSchema = z
  .array(characteristicSchema)
  .min(MIN_SELECTED_CHARS, {
    message: `Please select at least ${MIN_SELECTED_CHARS} tags`,
  })
  .max(MAX_SELECTED_CHARS, {
    message: `You can select up to ${MAX_SELECTED_CHARS} tags only`,
  });

const genderIdentitySchema = z.object({
  id: z.number(),
  toggle: z.boolean(),
  name: z.string(),
  emoji: z.string(),
});

const genderIdentitiesSchema = z
  .array(genderIdentitySchema)
  .nonempty({
    message: 'Please select at least one option',
  })
  .max(MAX_GENDERS, {
    message: `You can select up to ${MAX_GENDERS} options only`,
  });

const safeSpaceSchema = z.object({
  id: z.number(),
  toggle: z.boolean(),
  name: z.string(),
  emoji: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const safeSpacesSchema = z
  .array(safeSpaceSchema)
  .nonempty({
    message: 'Please select at least one option',
  })
  .max(MAX_GENDERS, {
    message: `You can select up to ${MAX_GENDERS} options only`,
  });

const districtSchema = z.object({
  id: z.number(),
  name: z.string(),
  toggle: z.boolean(),
  emoji: z.string().optional(),
});

const citySchema = z.object({
  id: z.number(),
  name: z.string(),
  flag: z.string(),
  country: z.string(),
});

const cityDistrictsSchema = z.object({
  city: citySchema,
  districts: z.array(districtSchema).nonempty({
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

const featureSchema = z.object({
  id: z.number(),
  name: z.string(),
  toggle: z.boolean(),
  emoji: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
const featuresSchema = z.array(featureSchema).min(MIN_SELECTED_FEATURES, {
  message: `Please select at least ${MIN_SELECTED_FEATURES} tags`,
});

const selfDescriptionSchema = z
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
  images: z
    .array(
      z.object({
        fileName: z.string(),
        fileSize: z.number(),
        height: z.number(),
        type: z.string(),
        uri: z.string(),
        width: z.number(),
      }),
    )
    .nonempty({
      message: 'Please upload at least one image',
    })
    .max(MAX_USER_IMAGES, {
      message: `You can upload up to ${MAX_USER_IMAGES} images only`,
    }),
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
  currency: z.enum(['eur', 'gbp', 'usd']),
});

const dateLengthSchema = z
  .object({
    fromDate: z
      .date({required_error: 'Please enter a start date'})
      .refine(val => dayjs(val).isAfter(dayjs().subtract(1, 'day')), {
        message: 'Start date cannot be in the past',
      }),
    untilDate: z.union([z.date(), z.null()]).optional(),
    permanent: z.boolean(),
  })
  .refine(data => data.permanent || data.untilDate !== null, {
    message: 'Please select an end date or mark as permanent',
    path: ['untilDate'],
  })
  .refine(
    data =>
      !data.untilDate || dayjs(data.untilDate).isAfter(dayjs(data.fromDate)),
    {
      message: 'End date must be after the start date',
      path: ['untilDate'],
    },
  );

const flatDetailsSchema = z.object({
  tagLine: z
    .string({required_error: 'Please enter a headline'})
    .min(1, {message: 'Please enter a headline'})
    .max(MAX_TAGLINE, {
      message: `Headline must be less than ${MAX_TAGLINE} characters`,
    }),
  size: z
    .number({
      required_error: 'Please enter the size of your flat',
      invalid_type_error: 'Size must be a number',
    })
    .positive('Please enter a valid size'),
});

const flatDescriptionSchema = z
  .string({
    required_error: `We need at least ${MIN_DESCRIPTION_CHARS} words to create your flat profile`,
  })
  .min(MIN_DESCRIPTION_CHARS, {
    message: 'We are sure you have more to say about your flat',
  })
  .max(MAX_DESCRIPTION_CHARS, {
    message: `That is great but we need to keep it less than ${MAX_DESCRIPTION_CHARS} words`,
  });

const flatImagesSchema = z
  .array(
    z.object({
      fileName: z.string(),
      fileSize: z.number(),
      height: z.number(),
      type: z.string(),
      uri: z.string(),
      width: z.number(),
    }),
  )
  .nonempty({
    message: 'Please upload at least one image',
  })
  .max(MAX_FLAT_IMAGES, {
    message: `You can upload up to ${MAX_FLAT_IMAGES} images only`,
  });

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {message: 'Must be at least 6 digits'}),
});

const signUpSchema = z
  .object({
    email: z.string().email({message: 'Invalid email address'}),
    password: z
      .string()
      .min(6, {message: 'Must be at least 6 digits'})
      .regex(/[A-Z]/, {
        message: 'Must have a uppercase letter',
      })
      .regex(/[0-9]/, {message: 'Must have a number'})
      .regex(/[^A-Za-z0-9]/, {
        message: 'Must have a special character',
      }),
    repeatPassword: z.string(),
    terms: z.boolean().refine(value => value === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine(data => data.password === data.repeatPassword, {
    message: 'Passwords must match',
    path: ['repeatPassword'],
  });

export {
  languageSchema,
  languagesSchema,
  characteristicSchema,
  characteristicsSchema,
  genderIdentitySchema,
  genderIdentitiesSchema,
  safeSpaceSchema,
  safeSpacesSchema,
  districtSchema,
  citySchema,
  cityDistrictsSchema,
  budgetSchema,
  featureSchema,
  featuresSchema,
  selfDescriptionSchema,
  nameSchema,
  addressSchema,
  dateLengthSchema,
  flatDescriptionSchema,
  flatDetailsSchema,
  flatImagesSchema,
  signInSchema,
  signUpSchema,
};
