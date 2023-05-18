import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchAdverts, toggleFavorite} from './advertMiddleware';

interface AdvertState {
  loading: boolean;
  adverts: [
    {
      id: number | null;
      status: string | null;
      currency: string | null;
      matchScore: number | null;
      price: number | null;
      favorite: boolean;
      applied: boolean;
      fromDate: number | null;
      toDate: number | null;
      created_at: string | null;
      applicants: any[] | null;
      user: boolean | null;
      lessor: boolean;
      flat: {
        id: number | null;
        address: string | null;
        description: string | null;
        tagLine: string | null;
        district: string | null;
        city: string | null;
        photos: string[] | null;
        charachteristics:
          | [
              {
                emoji: string | null;
                name: string | null;
              },
            ]
          | null;
        features:
          | [
              {
                emoji: string | null;
                name: string | null;
              },
            ]
          | null;
      };
    },
  ];
}

const initialState: AdvertState = {
  loading: false,
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
        description: null,
        tagLine: null,
        district: null,
        city: null,
        photos: null,
        charachteristics: null,
        features: null,
      },
    },
  ],
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
  },
});

export const {} = advertSlice.actions;
export default advertSlice.reducer;
