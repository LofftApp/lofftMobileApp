import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchAdverts,
  toggleFavorite,
  changeAdvertStatus,
  fetchAdvertById,
} from './advertMiddleware';

import type {AdvertState, IncomingAdvert} from './types';

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
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        console.log('fetchAdverts fullfilled ');
        const values = action.payload.adverts.map((advert: any) => {
          return {
            id: advert.id,
            status: advert.status,
            currency: advert.currency,
            matchScore: advert.match_score,
            price: advert.monthly_rent,
            favorite: advert.favorite,
            applied: advert.applied,
            fromDate: advert.from_date,
            toDate: advert.to_date,
            created_at: advert.created_at,
            applicants: advert.applicants,
            user: advert.user,
            lessor: advert.lessor,
            flat: {
              id: advert.flat.id,
              address: advert.flat.address,
              description: advert.flat.description,
              tagline: advert.flat.tag_line,
              district: advert.flat.district,
              city: advert.flat.city,
              characteristics: advert.flat.characteristics,
              features: advert.flat.features,
              photos: advert.flat.photos.map((photo: any) => photo.url),
            },
          };
        });
        state.adverts = values;
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
        const advert = state.adverts.find(advert => advert.id === advertId);
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
        state.error = null;
        state.loading = false;
        const formattedAdvert = {
          ...action.payload,
          monthlyRent: action.payload.monthly_rent,
          warmRent: action.payload.warm_rent,
          fromDate: action.payload.from_date,
          toDate: action.payload.to_date,
          matchScore: action.payload.match_score,
          createdAt: action.payload.created_at,
          flat: {
            ...action.payload.flat,
            tagLine: action.payload.flat.tag_line,
            measurementUnit: action.payload.flat.measurement_unit,
            photos: action.payload.flat.photos.map(
              (photo: {url: string}) => photo.url,
            ),
          },
          user: {
            ...action.payload.user,
            createdAt: action.payload.user.created_at,
            updatedAt: action.payload.user.updated_at,
            termsAccepted: action.payload.user.terms_accepted,
            userType: action.payload.user.user_type,
          },
          applicants: action.payload.applicants.map(applicant => ({
            ...applicant,
            createdAt: applicant.created_at,
            updatedAt: applicant.updated_at,
            termsAccepted: applicant.terms_accepted,
            userType: applicant.user_type,
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
