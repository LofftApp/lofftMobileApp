import {lofftApi} from 'features/api/lofftApi';
import {Advert, IncomingAdverts} from './types';

export const advertApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getAdverts: builder.query<Advert[], void>({
      query: () => '/api/adverts',
      transformResponse: (response: IncomingAdverts) =>
        response.adverts.map(advert => {
          return {
            id: advert.id,
            monthlyRent: advert.monthly_rent,
            currency: advert.currency,
            warmRent: advert.warm_rent,
            fromDate: advert.from_date,
            toDate: advert.to_date,
            createdAt: advert.created_at,
            status: advert.status,
            matchScore: advert.match_score,
            favorite: advert.favorite,
            applied: advert.applied,
            lessor: advert.lessor,
            flat: {
              id: advert.flat.id,
              address: advert.flat.address,
              tagLine: advert.flat.tag_line,
              description: advert.flat.description,
              size: advert.flat.size,
              measurementUnit: advert.flat.measurement_unit,
              district: advert.flat.district,
              characteristics: advert.flat.characteristics,
              features: advert.flat.features,
              city: advert.flat.city,
              photos: advert.flat.photos.map(photo => photo.url),
            },
            user: {
              id: advert.user.id,
              email: advert.user.email,
              createdAt: advert.user.created_at,
              updatedAt: advert.user.updated_at,
              termsAccepted: advert.user.terms_accepted,
              userType: advert.user.user_type,
              admin: advert.user.admin,
            },
            applicants: advert.applicants?.map(applicant => ({
              id: applicant.id,
              email: applicant.email,
              createdAt: applicant.created_at,
              updatedAt: applicant.updated_at,
              termsAccepted: applicant.terms_accepted,
              userType: applicant.user_type,
              admin: applicant.admin,
            })),
          };
        }),
    }),
  }),
  overrideExisting: false,
});

export const {useGetAdvertsQuery} = advertApi;
