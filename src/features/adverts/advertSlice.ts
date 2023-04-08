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
      favorite: boolean | null;
      fromDate: number | null;
      toDate: number | null;
      created_at: string | null;
      flat: {
        id: number | null;
        address: string | null;
        description: string | null;
        tagLine: string | null;
        district: string | null;
        city: string | null;
        photos: string[] | null;
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
      favorite: null,
      fromDate: null,
      toDate: null,
      matchScore: null,
      created_at: null,
      flat: {
        id: null,
        address: null,
        description: null,
        tagLine: null,
        district: null,
        city: null,
        photos: null,
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
        const values = action.payload.map((advert: any) => {
          return {
            id: advert.id,
            status: advert.status,
            currency: advert.currency,
            matchScore: advert.match_score,
            price: advert.price,
            favorite: advert.favorite,
            fromDate: advert.from_date,
            toDate: advert.to_date,
            created_at: advert.created_at,
            flat: {
              id: advert.flat.id,
              address: advert.flat.address,
              description: advert.flat.description,
              tagline: advert.flat.tag_line,
              district: advert.flat.district,
              city: advert.flat.city,
              photos: advert.flat.photos,
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
