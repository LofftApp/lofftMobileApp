import {lofftApi} from 'reduxFeatures/api/lofftApi';
import {Application, IncomingApplications} from './types';

export const applicationApi = lofftApi.injectEndpoints({
  endpoints: builder => ({
    getApplications: builder.query<Application[], void>({
      query: () => '/api/advert_applications',
      transformResponse: (response: IncomingApplications) =>
        response.applications.map(application => {
          return {
            id: application.id,
            advertId: application.advert_id,
            applicantId: application.applicant_id,
            status: application.status,
            createdAt: application.created_at,
            updatedAt: application.updated_at,
            advert: {
              id: application.advert.id,
              monthlyRent: application.advert.monthly_rent,
              currency: application.advert.currency,
              warmRent: application.advert.warm_rent,
              fromDate: application.advert.from_date,
              toDate: application.advert.to_date,
              createdAt: application.advert.created_at,
              status: application.advert.status,
              matchScore: application.advert.match_score,
              favorite: application.advert.favorite,
              applied: application.advert.applied,
              lessor: application.advert.lessor,
              flat: {
                id: application.advert.flat.id,
                address: application.advert.flat.address,
                tagLine: application.advert.flat.tag_line,
                description: application.advert.flat.description,
                size: application.advert.flat.size,
                measurementUnit: application.advert.flat.measurement_unit,
                district: application.advert.flat.district,
                characteristics: application.advert.flat.characteristics,
                features: application.advert.flat.features,
                city: application.advert.flat.city,
                photos: application.advert.flat.photos.map(photo => photo.url),
              },
              user: {
                id: application.advert.user.id,
                email: application.advert.user.email,
                createdAt: application.advert.user.created_at,
                updatedAt: application.advert.user.updated_at,
                termsAccepted: application.advert.user.terms_accepted,
                userType: application.advert.user.user_type,
                admin: application.advert.user.admin,
              },
            },
          };
        }),
    }),
  }),
  overrideExisting: false,
});

export const {useGetApplicationsQuery} = applicationApi;
