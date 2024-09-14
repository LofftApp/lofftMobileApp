import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchAdverts,
  toggleFavorite,
  changeAdvertStatus,
  fetchAdvertById,
} from './advertMiddleware';

import type {
  Advert,
  AdvertState,
  IncomingAdvert,
  IncomingAdverts,
} from './types';

const initialState: AdvertState = {
  loading: false,
  adverts: [],
  advert: null,
  error: null,
};

export const advertSlice = createSlice({
  name: 'advert',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAdverts.pending, state => {
      state.loading = true;
      console.log('fetchAdverts pending');
    });
    builder.addCase(
      fetchAdverts.fulfilled,
      (state, action: PayloadAction<IncomingAdverts>) => {
        state.loading = false;
        console.log('fetchAdverts fullfilled ');
        const formattedAdverts = action.payload.adverts.map(advert => {
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
              photos: advert.flat.photos.map(
                (photo: {url: string}) => photo.url,
              ),
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
        });
        state.adverts = formattedAdverts;
      },
    );
    builder.addCase(fetchAdverts.rejected, state => {
      state.loading = false;
      console.log('fetchAdverts rejected');
    });
    builder.addCase(
      toggleFavorite.fulfilled,
      (state, action: PayloadAction<any>) => {
        const advertId = action.payload.id;
        const advert = state.adverts.find(adv => adv.id === advertId);
        if (advert) {
          advert.favorite = !advert.favorite;
        }
      },
    );
    builder.addCase(changeAdvertStatus.fulfilled, (state, action) => {
      const advertId = action.payload.id;
      state.adverts.map(el => {
        if (el.id === advertId) {
          return {
            ...el,
            status: action.payload.status,
          };
        } else {
          return el;
        }
      });
    });
    builder.addCase(fetchAdvertById.pending, state => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(
      fetchAdvertById.fulfilled,
      (state, action: PayloadAction<IncomingAdvert>) => {
        console.log('fetchAdvertById.fulfilled');
        state.error = null;
        state.loading = false;
        const formattedAdvert: Advert = {
          id: action.payload.id,
          monthlyRent: action.payload.monthly_rent,
          currency: action.payload.currency,
          warmRent: action.payload.warm_rent,
          fromDate: action.payload.from_date,
          toDate: action.payload.to_date,
          createdAt: action.payload.created_at,
          status: action.payload.status,
          matchScore: action.payload.match_score,
          favorite: action.payload.favorite,
          applied: action.payload.applied,
          lessor: action.payload.lessor,
          flat: {
            id: action.payload.flat.id,
            address: action.payload.flat.address,
            tagLine: action.payload.flat.tag_line,
            description: action.payload.flat.description,
            size: action.payload.flat.size,
            measurementUnit: action.payload.flat.measurement_unit,
            district: action.payload.flat.district,
            characteristics: action.payload.flat.characteristics,
            features: action.payload.flat.features,
            city: action.payload.flat.city,
            photos: action.payload.flat.photos.map(
              (photo: {url: string}) => photo.url,
            ),
          },
          user: {
            id: action.payload.user?.id,
            email: action.payload.user?.email,
            createdAt: action.payload.user?.created_at,
            updatedAt: action.payload.user?.updated_at,
            termsAccepted: action.payload.user?.terms_accepted,
            userType: action.payload.user?.user_type,
            admin: action.payload.user?.admin,
          },
          applicants: action.payload.applicants?.map(applicant => ({
            id: applicant.id,
            email: applicant.email,
            createdAt: applicant.created_at,
            updatedAt: applicant.updated_at,
            termsAccepted: applicant.terms_accepted,
            userType: applicant.user_type,
            admin: applicant.admin,
          })),
        };
        state.advert = formattedAdvert;
      },
    );
    builder.addCase(
      fetchAdvertById.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload.error;
        state.loading = true;
      },
    );
  },
});

export const {} = advertSlice.actions;
export default advertSlice.reducer;
