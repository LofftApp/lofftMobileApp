import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchAdverts,
  toggleFavorite,
  changeAdvertStatus,
} from './advertMiddleware';

import type {AdvertState} from './types';
import {number} from 'prop-types';

const initialState: AdvertState = {
  loading: false,
  filterActivated: false,
  filterParams: [],
  adverts: [
    {
      id: null,
      status: null,
      currency: null,
      price: null,
      favorite: false,
      applied: false,
      fromDate: null,
      toDate: null,
      matchScore: null,
      created_at: null,
      applicants: null,
      user: null,
      lessor: false,
      flat: {
        id: null,
        address: null,
        price: null,
        description: null,
        tagline: null,
        district: null,
        city: null,
        photos: null,
        characteristics: null,
        features: null,
      },
    },
  ],
};

export const advertSlice = createSlice({
  name: 'advert',
  initialState,
  reducers: {
    activateFilter: state => {
      state.filterActivated = !state.filterActivated;
    },
    applyFilters: (state, action) => {
      const advertChars = action.payload.advertChars[0];
      const advertCharsParams = advertChars.map((el: any) => el.value);
      state.filterActivated = true;
      const filteredAdvertsByChars = state.adverts.filter(advert =>
        advert.flat.features?.some(feature =>
          advertCharsParams.includes(feature.name),
        ),
      );
      if (filteredAdvertsByChars.length >= 1) {
        state.adverts = filteredAdvertsByChars;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAdverts.pending, state => {
      state.loading = true;
      console.log('fetchAdverts pending');
    });
    builder.addCase(
      fetchAdverts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
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
  },
});

export const {activateFilter, applyFilters} = advertSlice.actions;
export default advertSlice.reducer;
